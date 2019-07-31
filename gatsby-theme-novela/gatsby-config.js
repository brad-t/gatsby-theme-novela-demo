const gatsbyRemarkPlugins = [
  `gatsby-remark-autolink-headers`,
  {
    resolve: `gatsby-remark-copy-linked-files`,
    options: {
      ignoreFileExtensions: [],
    },
  },
  {
    resolve: `gatsby-remark-prismjs`,
    options: {
      showLineNumbers: true,
    },
  },
];

module.exports = {
  siteMetadata: {
    title: `Narative`,
    name: `Narative`,
    siteUrl: `https://novela.netlify.com`,
    description: `This is my description that will be used in the meta tags and important for search results`,
    hero: {
      heading: `Perspectives on technology, design and business from the team at Narative.`,
      maxWidth: 652,
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/gatsbyjs`,
      },
      {
        name: `github`,
        url: `https://github.com/gatsbyjs`,
      },
      {
        name: `instagram`,
        url: `https://github.com/gatsbyjs`,
      },
      {
        name: `linkedin`,
        url: `https://github.com/gatsbyjs`,
      },
      {
        name: `dribbble`,
        url: `https://github.com/gatsbyjs`,
      },
    ],
  },
  mapping: {
    "MarkdownRemark.frontmatter.author": `AuthorsYaml`,
    "Mdx.frontmatter.author": `AuthorsYaml`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-transformer-yaml`,

    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/posts`,
        name: "posts",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/authors`,
        name: "authors",
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: { maxWidth: 680 },
          },
          { resolve: `gatsby-remark-copy-linked-files` },
          { resolve: `gatsby-remark-numbered-footnotes` },
          { resolve: `gatsby-remark-smartypants` },
        ],
        remarkPlugins: [require(`remark-slug`)],
      },
    },
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        displayName: process.env.NODE_ENV === `development`,
      },
    },
    `gatsby-plugin-theme-ui`,
  ],
};
