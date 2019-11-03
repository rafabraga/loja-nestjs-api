import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
@Entity({ name: 'teste_usuario' })
export class Usuario {

  @Field(type => Int)
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Field()
  @Column({ name: 'nome' })
  nome: string;

  @Field()
  @Column({ name: 'email' })
  email: string;

  @Field()
  @Column({ name: 'senha' })
  senha: string;

  @Field(type => Int)
  @Column({ name: 'tentativasinvalidassenha' })
  tentativasInvalidasSenha: number;

}
