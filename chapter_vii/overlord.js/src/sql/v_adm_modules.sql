-- View: v_adm_modules

CREATE OR REPLACE VIEW v_adm_modules
 AS
WITH RECURSIVE subordinates AS (
	SELECT
		id,
		module_id,
		name,
		null::varchar as parent,
		name::varchar as path,
		role,
		1 as level,
		icon,
		link,
    	status
	FROM
		adm_modules
	where module_id is null
	UNION all
		SELECT
			e.id,
			e.module_id,
			e.name,
			(select f.name from adm_modules f where id = e.module_id)::varchar as parent,
			(
				s.path || ' -> ' || e.name
			)::varchar as path,
			e.role,
			s.level + 1 AS level,
			e.icon,
			e.link,
			e.status
		FROM
			adm_modules e
		INNER JOIN subordinates s ON s.id = e.module_id
) SELECT
	*
FROM
	subordinates
order by id asc, name;
