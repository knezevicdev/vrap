import { useCallback, useState } from 'react';

const DEFAULT_COLORS = [
  { label: 'Beige', value: 'Beige' },
  { label: 'Black', value: 'Black' },
  { label: 'Blue', value: 'Blue' },
  { label: 'Bronze', value: 'Bronze' },
  { label: 'Brown', value: 'Brown' },
  { label: 'Gold', value: 'Gold' },
  { label: 'Gray', value: 'Gray' },
  { label: 'Green', value: 'Green' },
  { label: 'Orange', value: 'Orange' },
  { label: 'Pink', value: 'Pink' },
  { label: 'Purple', value: 'Purple' },
  { label: 'Red', value: 'Red' },
  { label: 'Silver', value: 'Silver' },
  { label: 'Turquoise', value: 'Turquoise' },
  { label: 'White', value: 'White' },
  { label: 'Yellow', value: 'Yellow' },
];

const defaultLocalState = {
  vinDecoded: false,
  year: null,
  make: null,
  model: null,
  extColors: DEFAULT_COLORS,
  trims: [],
  options: [],
  selectedExtColor: null,
  showOptionsGroup: false,
};

export interface LocalState {
  vinDecoded: boolean;
  year: number | null;
  make: string | null;
  model: string | null;
  extColors: Array<{ value: string; label: string }>;
  trims: Array<{ label: string; value: string; trimId?: number }>;
  options: Array<{ name: string; selected: boolean }>;
  selectedExtColor: { value: string; label: string } | null;
  showOptionsGroup: boolean;
}

const useLocalState = () => {
  const [localState, setLocalState] = useState<LocalState>(defaultLocalState);

  const resetLocalState = useCallback(() => {
    setLocalState(defaultLocalState);
  }, []);

  const updateLocalState = useCallback((state: Partial<LocalState>) => {
    setLocalState((prevState) => ({
      ...prevState,
      ...state,
    }));
  }, []);

  return {
    localState,
    resetLocalState,
    updateLocalState,
  };
};

export default useLocalState;
