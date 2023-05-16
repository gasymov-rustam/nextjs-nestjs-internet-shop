import { NextRouter } from 'next/router';
import { checkPriceFromQuery } from '../checkPriceFromQuery';
import { queryParamsOnFirstRender } from '../queryParamsOnFirstRender';

export const checkQueryParams = (router: NextRouter) => {
  const priceFromQueryValue = queryParamsOnFirstRender(
    'priceFrom',
    router
  ) as string;

  const priceToQueryValue = queryParamsOnFirstRender(
    'priceTo',
    router
  ) as string;

  const boilerQueryValue = JSON.parse(
    decodeURIComponent(queryParamsOnFirstRender('boiler', router) as string)
  );

  const partsQueryValue = JSON.parse(
    decodeURIComponent(queryParamsOnFirstRender('parts', router) as string)
  );

  const isValidBoilerQuery =
    Array.isArray(boilerQueryValue) && !!boilerQueryValue?.length;

  const isValidPartsQuery =
    Array.isArray(partsQueryValue) && !!partsQueryValue?.length;

  const isValidPriceQuery =
    checkPriceFromQuery(+priceFromQueryValue) &&
    checkPriceFromQuery(+priceToQueryValue);

  return {
    isValidBoilerQuery,
    isValidPartsQuery,
    isValidPriceQuery,
    priceFromQueryValue,
    priceToQueryValue,
    boilerQueryValue,
    partsQueryValue,
  };
};
