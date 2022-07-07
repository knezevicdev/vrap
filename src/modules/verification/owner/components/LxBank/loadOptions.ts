import { lendersByName } from 'src/networking/request';

export interface Option {
  value: string;
  label: string;
}

const loadOptions = (
  inputValue: string,
  callback: (options: Option[]) => void
): void => {
  lendersByName(inputValue)
    .then((lenders) => {
      callback(
        lenders.map(({ lenderName, lenderId }) => ({
          value: lenderId,
          label: lenderName,
        }))
      );
    })
    .catch(() => {
      callback([]);
    });
};

export default loadOptions;
