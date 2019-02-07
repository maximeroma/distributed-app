import unittest

from project import db
from project.api.models import User
from project.tests.base import BaseTestCase
from project.tests.utils import add_user

from sqlalchemy.exc import IntegrityError


class TestUserModel(BaseTestCase):
    def test_add_user(self):
        user = add_user(
            username='justatest',
            email='test@test.com',
            password='test'
        )

        self.assertTrue(user.id)
        self.assertEqual(user.username, 'justatest')
        self.assertEqual(user.email, 'test@test.com')
        self.assertTrue(user.active)

    def test_add_user_duplicate_username(self):
        add_user(
            username='justatest',
            email='test@test.com',
            password='test'
        )

        duplicate_user = User(
            username="justatest",
            email="test@test2.com",
            password='test'
        )
        db.session.add(duplicate_user)

        self.assertRaises(IntegrityError, db.session.commit)

    def test_add_user_duplicate_email(self):
        add_user(
            username='justanothertest',
            email='test@test.com',
            password='test'
        )

        duplicate_user = User(
            username="justatest",
            email="test@test.com",
            password='test'
        )
        db.session.add(duplicate_user)

        self.assertRaises(IntegrityError, db.session.commit)

    def test_to_json(self):
        user = add_user(
            username='justatest',
            email='test@test.com',
            password='test'
        )

        self.assertTrue(isinstance(user.to_json(), dict))

    def test_passwords_are_random(self):
        user_one = add_user('justatest', 'test@test.com', 'greaterthanheight')
        user_two = add_user('justatest2', 'test@test2.com', 'greaterthanheight')
        self.assertNotEqual(user_one.password, user_two.password)

if __name__ == '__main__':
    unittest.main()
