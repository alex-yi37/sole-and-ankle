import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const hasSale = salePrice !== null && salePrice !== undefined;

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price hasSale={hasSale}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {hasSale ? <SalePrice>{formatPrice(salePrice)}</SalePrice> : null}
        </Row>
        {variant === "on-sale" ? (
          <SaleTag>Sale</SaleTag>
        ) : variant === "new-release" ? (
          <NewReleaseTag>Just released!</NewReleaseTag>
        ) : null}
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 400px;
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: ${(props) => {
    return props.hasSale ? "line-through" : "initial";
  }};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

// InfoTag to represent the variant for a shoe. Text options are:
// "Just released!" | "Sale"
// in the case of the default variant, don't display the component
const SaleTag = styled.span`
  background: ${COLORS.primary};
  color: ${COLORS.white};
  font-weight: ${WEIGHTS.medium};
  padding: 8px;
  position: absolute;
  top: 16px;
  right: -8px;
  border-radius: 4px;
`;
const NewReleaseTag = styled.span`
  background: ${COLORS.secondary};
  color: ${COLORS.white};
  font-weight: ${WEIGHTS.medium};
  padding: 8px;
  position: absolute;
  top: 16px;
  right: -8px;
  border-radius: 4px;
`;

export default ShoeCard;
