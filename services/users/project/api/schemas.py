import graphene
from graphene_sqlalchemy import (
    SQLAlchemyObjectType,
    SQLAlchemyConnectionField,
)
from project.api.models import User as UserModel
from project import db


class User(SQLAlchemyObjectType):
    class Meta:
        model = UserModel
        interfaces = (graphene.relay.Node,)


class Query(graphene.ObjectType):
    node = graphene.relay.Node.Field()
    all_users = SQLAlchemyConnectionField(User)


class CreateUser(graphene.Mutation):
    class Arguments:
        password = graphene.String(required=True)
        username = graphene.String(required=True)
        email = graphene.String(required=True)

    user = graphene.Field(lambda: User)

    def mutate(self, info, password, username, email):
        db.session.add(UserModel(
            username=username,
            password=password,
            email=email
        ))
        db.session.commit()
        user = db.session.query(UserModel).filter_by(username=username).first()

        return CreateUser(user=user)


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
