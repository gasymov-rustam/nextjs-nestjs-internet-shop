import { guidGenerator } from '../guidGenerator';

export const createManufacturerCheckboxObj = (title: string) => ({
  title,
  checked: false,
  id: guidGenerator(),
});
