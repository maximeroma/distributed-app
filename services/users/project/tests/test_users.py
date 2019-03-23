import json
import unittest

from project.tests.base import BaseTestCase
from project.tests.utils import add_user
from project.api.models import User
from project import db


def test_add_user(add_admin_logged, client):
    token = add_admin_logged['token']
    response = client.post(
        '/users',
        data=json.dumps({
            'username': 'michael',
            'email': 'michael@mherman.org',
            'password': 'test'
        }),
        content_type='application/json',
        headers={'Authorization': f'Bearer {token}'}
    )
    data = json.loads(response.data.decode())

    assert response.status_code == 201
    assert 'michael@mherman.org was added!' == data['message']
    assert 'success' == data['status']


def test_add_user_invalid_json_keys_empty_object(add_admin_logged, client):
    token = add_admin_logged['token']

    response = client.post(
        '/users',
        data=json.dumps({}),
        content_type='application/json',
        headers={'Authorization': f'Bearer {token}'}
    )
    data = json.loads(response.data.decode())

    assert response.status_code == 400
    assert data == {'message': 'Invalid payload.', 'status': 'fail'}


def test_add_user_invalid_json_keys_no_username(add_admin_logged, client):
    token = add_admin_logged['token']
    response = client.post(
        '/users',
        data=json.dumps(dict({
            'email': 'test1@mherman.org',
            'password': 'test1'
        })),
        content_type='application/json',
        headers={'Authorization': f'Bearer {token}'}
    )
    data = json.loads(response.data.decode())

    assert response.status_code == 400
    assert data == {'message': 'Invalid payload.', 'status': 'fail'}


def test_add_user_invalid_json_keys_no_password(add_admin_logged, client):
    token = add_admin_logged['token']
    response = client.post(
        '/users',
        data=json.dumps(dict({
            'email': 'michael@mherman',
            'username': 'michael'
        })
        ),
        content_type='application/json',
        headers={'Authorization': f'Bearer {token}'}
    )
    data = json.loads(response.data.decode())

    assert response.status_code == 400
    assert data == {'message': 'Invalid payload.', 'status': 'fail'}


def test_add_user_duplicate_email(add_admin_logged, client):
    token = add_admin_logged['token']
    client.post(
        '/users',
        data=json.dumps({
            'username': 'michael',
            'email': 'michael@mherman.org',
            'password': 'test'
        }),
        content_type='application/json',
        headers={'Authorization': f'Bearer {token}'}
    )
    response = client.post(
        '/users',
        data=json.dumps({
            'username': 'michael',
            'email': 'michael@mherman.org',
            'password': 'test'
        }),
        content_type='application/json',
        headers={'Authorization': f'Bearer {token}'}
    )
    data = json.loads(response.data.decode())

    assert response.status_code == 400
    assert data == {'message': 'Sorry. That email already exists.',
                    'status': 'fail'}


def test_add_user_not_admin(client, db_init):
    add_user('test1', 'test1@test1.com', 'test1')
    resp_login = client.post('/auth/login',
                             data=json.dumps({'email': 'test1@test1.com',
                                              'password': 'test1'}),
                             content_type='application/json')
    token = json.loads(resp_login.data.decode())['auth_token']
    response = client.post('/users',
                           data=json.dumps({'username': 'michael',
                                            'email': 'michael@sonotreal.com',
                                            'password': 'test'}),
                           content_type='application/json',
                           headers={'Authorization': f'Bearer {token}'}
                           )
    data = json.loads(response.data.decode())
    assert data == {'status': 'fail',
                    'message': 'You do not have permission to do that.'}
    assert response.status_code == 401


class TestUserService(BaseTestCase):

    def test_users(self):
        response = self.client.get('/users/ping')
        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code, 200)
        self.assertIn('pong!', data['message'])
        self.assertIn('success', data['status'])

    def test_get_single_user(self):
        user = add_user('michael', 'michael@mherman.org', 'test')

        with self.client:
            response = self.client.get(f'/users/{user.id}')
            data = json.loads(response.data.decode())

            self.assertEqual(response.status_code, 200)
            self.assertIn('michael', data['data']['username'])
            self.assertIn('michael@mherman.org', data['data']['email'])
            self.assertIn('success', data['status'])

    def test_get_single_user_no_id(self):
        with self.client:
            response = self.client.get('/users/blah')
            data = json.loads(response.data.decode())

            self.assertEqual(response.status_code, 404)
            self.assertIn('User does not exist', data['message'])
            self.assertIn('fail', data['status'])

    def test_get_single_user_incorrect_id(self):
        with self.client:
            response = self.client.get('/users/999')
            data = json.loads(response.data.decode())

            self.assertEqual(response.status_code, 404)
            self.assertIn('User does not exist', data['message'])
            self.assertIn('fail', data['status'])

    def test_all_users(self):
        add_user(
            username='michael',
            email='michael@mherman.org',
            password='test1'
        )
        add_user(
            username='fletcher',
            email='fletcher@notreal.com',
            password='test2'
        )

        with self.client:
            response = self.client.get('/users')
            data = json.loads(response.data.decode())

            self.assertEqual(response.status_code, 200)
            self.assertEqual(len(data['data']['users']), 2)
            self.assertIn('michael', data['data']['users'][0]['username'])
            self.assertIn('michael@mherman.org',
                          data['data']['users'][0]['email'])
            self.assertIn('fletcher', data['data']['users'][1]['username'])
            self.assertIn('fletcher@notreal.com',
                          data['data']['users'][1]['email'])
            self.assertIn('success', data['status'])

    def test_main_no_users(self):
        response = self.client.get('/')

        self.assertEqual(response.status_code, 200)
        self.assertIn(b'All Users', response.data)
        self.assertIn(b'<p>No users!</p>', response.data)

    def test_main_with_users(self):
        add_user('michael', 'michael@mherman.org', 'test')
        add_user('fletcher', 'fletcher@notreal.com', 'test')
        with self.client:
            response = self.client.get('/')

            self.assertEqual(response.status_code, 200)
            self.assertIn(b'All Users', response.data)
            self.assertNotIn(b'<p>No users!</p>', response.data)
            self.assertIn(b'fletcher', response.data)

    def test_main_add_user(self):
        with self.client:
            response = self.client.post(
                '/',
                data=dict(username="michael",
                          email="michael@sonotreal.com",
                          password='test'),
                follow_redirects=True
            )

            self.assertEqual(response.status_code, 200)
            self.assertIn(b'All Users', response.data)
            self.assertNotIn(b'<p>No users!</p>', response.data)
            self.assertIn(b'michael', response.data)

    def test_add_user_inactive(self):
        add_user('test2', 'test2@test.com', 'test2')
        user = User.query.filter_by(email='test2@test.com').first()
        user.active = False
        db.session.commit()
        with self.client:
            resp_login = self.client.post(
                '/auth/login',
                data=json.dumps({'email': 'test2@test.com',
                                 'password': 'test2'}),
                content_type='application/json',
            )
            token = json.loads(resp_login.data.decode())['auth_token']
            response = self.client.post(
                '/users',
                data=json.dumps({
                    'username': 'michael',
                    'email': 'michael@sonotreal.com',
                    'password': 'test'
                }),
                content_type='application/json',
                headers={'Authorization': f'Bearer {token}'}
            )
            data = json.loads(response.data.decode())
            self.assertEqual(data,
                             {'status': 'fail',
                              'message': 'Provide a valid auth token.'})
            self.assertEqual(response.status_code, 401)


if __name__ == '__main__':
    unittest.main()
