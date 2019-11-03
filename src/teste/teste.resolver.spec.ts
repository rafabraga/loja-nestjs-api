import { Test, TestingModule } from '@nestjs/testing';
import { TesteResolver } from './teste.resolver';

describe('TesteResolver', () => {
  let resolver: TesteResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TesteResolver],
    }).compile();

    resolver = module.get<TesteResolver>(TesteResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
