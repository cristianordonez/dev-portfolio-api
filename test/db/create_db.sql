CREATE TABLE public.repos (
    name character varying(150),
    image character varying(200),
    description character varying(5000),
    url character varying(200),
    id character varying(100) NOT NULL,
    deploy_url character varying(255),
    user_id character varying(255)
);

CREATE TABLE public.users (
    name character varying(100) NOT NULL,
    id character varying(100) NOT NULL
);

ALTER TABLE ONLY public.repos
    ADD CONSTRAINT name_unique UNIQUE (name);

ALTER TABLE ONLY public.repos
    ADD CONSTRAINT repo_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_name_unique UNIQUE (name);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pk PRIMARY KEY (id);

CREATE INDEX fki_repos_user_id_fk ON public.repos USING btree (user_id);

ALTER TABLE ONLY public.repos
    ADD CONSTRAINT repos_user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) NOT VALID;
