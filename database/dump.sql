--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_pkey;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_pkey;
ALTER TABLE IF EXISTS ONLY public.carts DROP CONSTRAINT IF EXISTS carts_pkey;
ALTER TABLE IF EXISTS ONLY public."cartItems" DROP CONSTRAINT IF EXISTS "cartItems_pkey";
ALTER TABLE IF EXISTS public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE IF EXISTS public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
DROP SEQUENCE IF EXISTS public."products_productId_seq";
DROP TABLE IF EXISTS public.products;
DROP SEQUENCE IF EXISTS public."orders_orderId_seq";
DROP TABLE IF EXISTS public.orders;
DROP SEQUENCE IF EXISTS public."carts_cartId_seq";
DROP TABLE IF EXISTS public.carts;
DROP SEQUENCE IF EXISTS public."cartItems_cartItemId_seq";
DROP TABLE IF EXISTS public."cartItems";
DROP EXTENSION IF EXISTS plpgsql;
DROP SCHEMA IF EXISTS public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL
);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    name text NOT NULL,
    "creditCard" text NOT NULL,
    "shippingAddress" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: cartItems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartItemId", "cartId", "productId", price) FROM stdin;
67	52	2	2595
68	52	3	2900
69	52	2	2595
70	52	3	2900
71	53	2	2595
72	53	2	2595
73	54	3	2900
74	55	3	2900
75	56	5	9900
76	57	4	8750
77	57	4	8750
78	57	5	5840
79	57	2	4990
80	58	5	5840
81	58	1	4520
82	58	1	4520
83	58	5	5840
84	59	5	5840
85	59	5	5840
86	59	5	5840
87	59	5	5840
88	59	4	8750
89	59	5	5840
90	59	5	5840
91	59	5	5840
92	59	5	5840
93	59	5	5840
94	59	5	5840
95	59	5	5840
96	59	5	5840
97	59	5	5840
98	59	5	5840
99	59	5	5840
100	59	5	5840
101	59	5	5840
102	59	5	5840
103	59	5	5840
104	59	5	5840
105	59	5	5840
106	59	5	5840
107	59	5	5840
108	59	5	5840
109	59	5	5840
110	59	5	5840
111	59	5	5840
112	59	5	5840
113	59	5	5840
114	59	5	5840
115	59	5	5840
116	59	5	5840
117	59	5	5840
118	59	5	5840
119	59	5	5840
120	59	5	5840
121	59	5	5840
122	59	5	5840
123	59	5	5840
124	59	5	5840
125	59	5	5840
126	59	5	5840
127	59	5	5840
128	59	5	5840
129	59	5	5840
130	59	5	5840
131	59	5	5840
132	59	5	5840
133	59	5	5840
134	59	5	5840
135	59	1	4520
136	59	4	8750
137	60	4	8750
138	60	4	8750
139	61	4	8750
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
52	2020-11-05 21:36:55.803954+00
53	2020-11-05 21:40:22.455935+00
54	2020-11-05 22:46:45.256969+00
55	2020-11-06 01:04:58.65408+00
56	2020-11-06 01:08:15.841369+00
57	2020-11-17 02:42:26.687219+00
58	2020-11-17 19:15:23.976649+00
59	2020-11-17 21:39:54.212699+00
60	2020-11-18 00:37:37.803411+00
61	2020-11-18 01:04:22.314542+00
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", name, "creditCard", "shippingAddress", "createdAt") FROM stdin;
1	53	ashi	2222333344445555	the strees of the city of there 111101	2020-11-05 23:02:21.671435+00
2	53	ashi	2222333344445555	the strees of the city of there 111101	2020-11-05 23:03:57.031855+00
3	53	ashi	2222333344445555	the strees of the city of there 111101	2020-11-05 23:15:32.698143+00
4	54	ashkan	1111000011110000	here next to there 111101	2020-11-06 00:56:47.132734+00
5	55	ash kannnnn	0012	homeaddress	2020-11-06 01:05:25.646237+00
6	56	Ashkan final order	000100	homeaddress	2020-11-06 01:08:38.408848+00
7	57	uyj	yujyj	hj	2020-11-17 04:51:22.239465+00
8	58	jhg	ghg	hnrty	2020-11-17 21:39:27.246011+00
9	59	ash	5678	cds	2020-11-18 00:27:43.55237+00
10	60	b	43	bfbg	2020-11-18 00:37:58.052438+00
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription") FROM stdin;
5	Perri`s Pink Floyd	5840	/images/perris-pink-floyd.jpg	Perri`s Guitar Picks - 12 Pack of Pink Floyd Pink Floyd	This Perri`s Guitar Pick 12-Pack is an assortment of 12 medium-gauge picks, each featuring a high-resolution image of a Pink Floyd album cover or the band`s name.
1	Dava Grip Tips Delrin	4520	/images/dava-grip-tips.jpg	Dava Grip Tips Delrin Medium Assorted Colors 6-Pack	Grip Tips picks are the first ever pick with a completely over-molded rubber grip to give you an incredible nonslip surface. Multi-gauge design and thin profile give you maximum control. Set of 6.
3	Perri`s The Beatles	8330	/images/perris-the-beatles.jpg	Perri`s The Beatles - 12-Pack Guitar Picks Various Albums	This 12 pack contains 6 different licensed Beatles designs. Each pick is printed one sided with high quality ink in vibrant colors.
6	Dava Rock Control	6250	/images/dave-rock-control.jpg	Dava Rock Control Delrin Medium Red 6-Pack	Dava Rock Control Picks feature a larger control area and insert molded tips for the best sound. Made from Delrin, a very smooth material that glides over strings for a fast action and is used by rock, jazz, and fusion players. Dava`s multi-gauge grip gives you the dynamics of multiple pick gauges on the fly--simply choke up on the tip for a hard gauge or release the flexible center section for a soft gauge.
2	D`Andrea 351 Vintage	4990	/images/dandrea-351-vintage.jpg	D`Andrea 351 Vintage Designer Celluloid Picks	D`Andrea` Designer Celluloid guitar picks provide players with a nearly perfect striking surface. The unique combination of durability, flexibility, and "memory" make this pick the top choice for the serious player. Included in the tin are two pieces of each of the six designer celluloid patterns in thin, medium and heavy gauges.
4	D`Addario Joe Satriani	8750	/images/daddario-joe-satriani.jpg	D`Addario Planet Waves Joe Satriani Signature Guitar Picks	Joe Satriani picks are available in white and black. Each set contains 10 different pieces of original art on the same premium celluloid picks Satriani uses.
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 139, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 61, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 10, true);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 1, false);


--
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("productId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

