import pytest
import json
from project import create_app, db
from project.tests.utils import add_user
from project.api.models import User


@pytest.fixture(scope='module')
def client():
    app = create_app()
    app.config.from_object('project.config.TestingConfig')

    client = app.test_client()
    ctx = app.app_context()
    ctx.push()
    yield client

    ctx.pop()


@pytest.fixture(scope='module')
def db_init():
    db.create_all()
    db.session.commit()

    yield

    db.session.remove()
    db.drop_all()


@pytest.fixture(scope='module')
def new_user(client, db_init):
    user = add_user('test', 'test@test.com', 'test')

    yield {'db': db, 'return_user': user}


@pytest.fixture(scope='module')
def add_admin_user(client, db_init):
    user = User(
        username="admin",
        email="admin@admin.com",
        password="admin",
        admin=True
    )
    db.session.add(user)
    db.session.commit()

    yield {'db': db, 'user': user}


@pytest.fixture(scope='module')
def add_user_logged(client, new_user):
    resp_login = client.post(
        '/auth/login',
        data=json.dumps({
            'email': 'test@test.com',
            'password': 'test'
        }),
        content_type='application/json'
    )
    token = json.loads(resp_login.data.decode())['auth_token']

    yield {'return_token': token}


@pytest.fixture(scope='module')
def add_admin_logged(client, add_admin_user):
    resp_login = client.post(
        '/auth/login',
        data=json.dumps({
            'email': 'admin@admin.com',
            'password': 'admin'
        }),
        content_type='application/json'
    )
    token = json.loads(resp_login.data.decode())['auth_token']

    yield {'token': token}
