import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class TesteDTO {

    @Field(type => Int)
    id: number;

    @Field()
    nome: string;

}
