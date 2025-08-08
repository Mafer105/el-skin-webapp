import searchReducer, { setTerm } from './searchSlice';
 
const estadoAnterior = { term: 'foo' };
 
describe('searchSlice', () => {
  it('deve retornar o estado inicial', () => {
    const novoEstado = searchReducer(undefined, { type: '' });
    expect(novoEstado).toEqual({term: ''});
  });
 
  it('deve definir o termo de pesquisa', () => {
    const novoEstado = searchReducer(undefined, setTerm('teste'));
    expect(novoEstado.term).toBe('teste');
  });
 
  it('deve alterar o termo de pesquisa', () => {
    const novoEstado = searchReducer(estadoAnterior, setTerm('teste'));
    expect(novoEstado.term).toBe('teste');
  });
});