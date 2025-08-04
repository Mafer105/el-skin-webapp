import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setTerm } from '../store/slices/searchSlice';

export const useSearch = () => {
  const dispatch = useDispatch();
  const term = useSelector((state: RootState) => state.search.term);

  return {
    term,
    setTerm: (term: string) => {
      dispatch(setTerm(term));
    },
  };
};
