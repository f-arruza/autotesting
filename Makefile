migrate:
	docker-compose run --rm django ./manage.py makemigrations --settings=testingtool.settings.dev
	docker-compose run --rm django ./manage.py migrate auth --settings=testingtool.settings.dev
	docker-compose run --rm django ./manage.py migrate --settings=testingtool.settings.dev

requirements:
	docker-compose run --rm django pip install -r dockerfiles/requirements/dev.txt

statics:
	docker-compose run --rm django ./manage.py collectstatic --no-input --settings=testingtool.settings.dev

superuser:
	docker-compose run --rm django ./manage.py createsuperuser --settings=testingtool.settings.dev

reload:
	docker-compose build --no-cache
	docker-compose up -d

loaddata:
	docker-compose run --rm django ./manage.py loaddata initial --settings=testingtool.settings.dev
	docker-compose run --rm django ./manage.py loaddata auth --settings=testingtool.settings.dev

clean:
	rm -rf testingtool/*/migrations/00**.py
	find . -name "*.pyc" -exec rm -rf  -- {} +
	find . -name "*__pycache__" -exec rm -rf  -- {} +

valiomadres:
	docker-compose down -v
	sudo rm -rf pgdata/

test:
	docker-compose run --rm django ./manage.py test --settings=testingtool.settings.dev
