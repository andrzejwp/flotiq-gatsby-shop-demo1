import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../layouts/layout';
import CategoriesChoiceBar from '../components/CategoriesChoiceBar';

const IndexPage = ({ data }) => {
    const products = data.allProduct.nodes;
    const categoryTabs = [
        { name: 'New', href: '#', current: true },
        { name: 'Shoes', href: '#', current: false },
        { name: 'Clothing', href: '#', current: false },
        { name: 'Accessories', href: '#', current: false },
    ];

    return (
        <Layout additionalClass={['bg-white']}>
            <Helmet>
                <title>Flotiq Gatsby shop starter</title>
            </Helmet>
            <CategoriesChoiceBar additionalClass={['my-5']} categoryTabs={categoryTabs} />
            <div>
                {products.map((product) => (
                    <a href={product.slug} className="block">{product.name}</a>
                ))}
            </div>
        </Layout>
    );
};

export const pageQuery = graphql`
    query indexQuery($skip: Int!, $limit: Int!) {
        site {
            siteMetadata {
                title
            }
        }
        allProduct(sort: {fields: flotiqInternal___createdAt, order: DESC}, limit: $limit, skip: $skip,) {
            nodes {
                name
                price
                slug
                description
                id
                productGallery {
                    extension
                    url
                    width
                    height
                    localFile {
                        publicURL
                        childImageSharp {
                            gatsbyImageData(layout: FULL_WIDTH)
                        }
                    }
                }
                productImage {
                    extension
                    url
                    width
                    height
                    localFile {
                        publicURL
                        childImageSharp {
                            gatsbyImageData(layout: FULL_WIDTH)
                        }
                    }
                }
            }
        }
    }
`;

export default IndexPage;
