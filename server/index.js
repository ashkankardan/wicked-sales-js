require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {

  const sql = `
    select "productId", "name", "price", "image", "shortDescription"
    from "products"
  `;
  db.query(sql)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {

  const productId = req.params.productId;
  const sql = `
    select *
    from "products"
    where "productId" = $1
  `;
  const values = [productId];

  db.query(sql, values)
    .then(result => {
      if (result.rows[0]) {
        res.status(200).json(result.rows[0]);
      } else {
        next(new ClientError(`cannot find productId ${productId}`, 404));
      }
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) {
    res.status(200).json([]);

  } else {

    const sql = `
      select "c"."cartItemId",
            "c"."price",
            "p"."productId",
            "p"."image",
            "p"."name",
            "p"."shortDescription"
        from "cartItems" as "c"
        join "products" as "p" using ("productId")
      where "c"."cartId" = $1
    `;

    const values = [req.session.cartId];

    db.query(sql, values)
      .then(result => {
        res.status(200).json(result.rows);
      });
  }
});

app.post('/api/cart', (req, res, next) => {
  const productId = parseInt(req.body.productId, 10);
  if (!Number.isInteger(productId) || productId <= 0) {
    res.status(400).json({
      error: '"productId" must be a positive integer'
    });
  }

  const sql = `
    select "price"
    from "products"
    where "productId" = $1
  `;

  const values = [productId];
  db.query(sql, values)
    .then(result => {
      if (!result.rows[0]) {
        next(new ClientError(`cannot find productId ${productId}`, 400));
      } else {
        const cartItemPrice = result.rows[0];

        if (req.session.cartId) {

          const newCartObj = cartItemPrice;
          newCartObj.cartId = req.session.cartId;
          return newCartObj;

        } else {
          const insert = `
          insert into "carts" ("cartId", "createdAt")
          values (default, default)
          returning "cartId"
        `;
          return db.query(insert).then(result => {
            const newCartObj = result.rows[0];
            newCartObj.price = cartItemPrice.price;
            return newCartObj;
          });
        }
      }
    })
    .then(newCartObj => {
      req.session.cartId = newCartObj.cartId;

      const insert = `
        insert into "cartItems" ("cartId", "productId", "price")
        values ($1, $2, $3)
        returning "cartItemId"
      `;

      const values = [newCartObj.cartId, productId, newCartObj.price];

      return db.query(insert, values)
        .then(result => {
          const cartItemIdObj = result.rows[0];
          return cartItemIdObj;
        });

    })
    .then(cartItemIdObj => {
      const sql = `
        select "c"."cartItemId",
              "c"."price",
              "p"."productId",
              "p"."image",
              "p"."name",
              "p"."shortDescription"
             from "cartItems" as "c"
             join "products" as "p" using ("productId")
            where "c"."cartItemId" = $1
      `;

      const values = [cartItemIdObj.cartItemId];

      return db.query(sql, values)
        .then(result => {
          res.status(201).json(result.rows[0]);
        });

    })
    .catch(err => next(err));
});

app.post('/api/orders', (req, res, next) => {

  const sessionCartId = req.session.cartId;
  const paymentName = req.body.name;
  const paymentCreditCard = req.body.creditCard;
  const paymentShippingAddress = req.body.shippingAddress;

  if (!req.session.cartId) {
    return res.status(400).json({
      error: 'no session cartId found!'
    });
  }

  if (!paymentName || !paymentCreditCard || !paymentShippingAddress) {
    res.status(402).json({
      error: 'payment information required!'
    });
  } else {

    const insert = `
      insert into "orders" ("cartId", "name", "creditCard", "shippingAddress")
      values ($1, $2, $3, $4)
      returning *
    `;

    const values = [sessionCartId, paymentName, paymentCreditCard, paymentShippingAddress];

    db.query(insert, values)
      .then(result => {
        delete req.session.cartId;
        res.status(201).json(result.rows[0]);
      })
      .catch(err => console.error(err));
  }
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
