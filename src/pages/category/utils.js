import React from 'react';
import ShirtIcon from '../../../assets/icons/shirt.svg';
import BikiniIcon from '../../../assets/icons/bikini.svg';
import Dress from '../../../assets/icons/dress.svg';
import ManPants from '../../../assets/icons/man_pants.svg';
import ManShoes from '../../../assets/icons/man_shoes.svg';
import ManUnderwear from '../../../assets/icons/man_underwear.svg';
import TShirt from '../../../assets/icons/Tshirt.svg';
import WomanBag from '../../../assets/icons/woman_bag.svg';
import WomanPants from '../../../assets/icons/woman_pants.svg';

import WomanShoes from '../../../assets/icons/woman_shoes.svg';
import WomanTShirt from '../../../assets/icons/woman_tshirt.svg';
import Skirt from '../../../assets/icons/skirt.svg';

const height = 30;
const width = 30;
export const CATEGORY ={
  SHIRT: 1,
  BIKINI: 2
}

export const categories = [
  {
    id: 1,
    label: 'Shirt',
    icon: () => <ShirtIcon height={height} width={width} />,
    value: CATEGORY.SHIRT
  },
  {
    id: 2,
    label: 'Bikini',
    icon: () => <BikiniIcon height={height} width={width} />,
    value: CATEGORY.BIKINI

  },
  {
    id: 3,
    label: 'Dress',
    icon: () => <Dress height={height} width={width} />,
    value: CATEGORY.BIKINI

  },
  {
    id: 4,
    label: 'Man Pants',
    icon: () => <ManPants height={height} width={width} />,
    value: CATEGORY.BIKINI

  },
  {
    id: 5,
    label: 'Man Shoes',
    icon: () => <ManShoes height={height} width={width} />,
    value: CATEGORY.BIKINI

  },
  {
    id: 6,
    label: 'Man Underwear',
    icon: () => <ManUnderwear height={height} width={width} />,
    value: CATEGORY.BIKINI

  },
  {
    id: 7,
    label: 'Man T-shirt',
    icon: () => <TShirt height={height} width={width} />,
    value: CATEGORY.BIKINI

  },
  {
    id: 8,
    label: 'Woman Bag',
    icon: () => <WomanBag height={height} width={width} />,
    value: CATEGORY.BIKINI

  },
  {
    id: 9,
    label: 'Woman Pants',
    icon: () => <WomanPants height={height} width={width} />,
    value: CATEGORY.BIKINI

  },
  { 
    id:10,
    label: 'High Heel',
    icon: () => <WomanShoes height={height} width={width} />,
    value: CATEGORY.BIKINI

  },
  {
    id: 11,
    label: 'Woman T-Shirt',
    icon: () => <WomanShoes height={height} width={width} />,
    value: CATEGORY.BIKINI

  },
  {
    id: 12,
    label: 'Skirt',
    icon: () => <Skirt height={height} width={width} />,
    value: CATEGORY.BIKINI

  },
];
