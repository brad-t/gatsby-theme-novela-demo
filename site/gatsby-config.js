module.exports = {
  siteMetadata: {
    title: `Novela by Narative`,
    name: `Novela by Narative`,
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
  plugins: [
    {
      resolve: "gatsby-theme-novela",
      options: {},
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Novela by Narative`,
        short_name: `Novela`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
  ],
};
