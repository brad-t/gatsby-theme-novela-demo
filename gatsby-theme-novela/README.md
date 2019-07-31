# Gatsby Theme Novela

WIP

### Installation

```sh
  # in your Gatsby project
  yarn add @narative/gatsby-theme-novela
```

### Configuration

#### Options

#### Configuring Novela Theme Plugin

You can customize the path of the generated site or where you store your authors and posts.

| Option       |     Default     |
| ------------ | :-------------: |
| basePath     |  content/posts  |
| contentPosts | content/authors |
| basePath     |        /        |

This is the default and recommended configuration

```
  my-gatsby-site
  └── content
    ├── authors
    └── posts
```

#### Configuring siteMetadata

In order to configure the theme to properly genreate the pages and meta tags you must certain
keys in your `siteMetadata`.
The ones that are special for this theme are `hero.heading`, `hero.maxWidth`, and `social`.

| Key           | Required |     Type      |
| ------------- | :------: | :-----------: |
| title         | required |    string     |
| name          | required |    string     |
| siteUrl       | required |    string     |
| description   | required |    string     |
| hero.heading  | required |    string     |
| hero.maxWidth | optional |    number     |
| social        | optional | [{name, url}] |

#### Example of a basic configuration

```js
module.exports = {
  /**
   * siteMetadata Used throughout the theme to gnereate the right SEO links,
   * social links, and homepage hero
   **/
  siteMetadata: {
    title: `Novela by Narative`,
    name: `Narative`,
    siteUrl: `https://gatsby-theme-novela.netlify.com`,
    description: `This is my description that will be used in the meta tags and important for search results`,

    // important to set the main text that appears in the hero
    hero: {
      heading: `Perspectives on technology, design and business from the team at Narative.`,
      maxWidth: 652,
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/narative`,
      },
      {
        name: `github`,
        url: `https://github.com/narative`,
      },
      {
        name: `instagram`,
        url: `https://www.instagram.com/narative.co/`,
      },
      {
        name: `dribbble`,
        url: `https://dribbble.com/narativestudio`,
      },
    ],
  },
  plugins: [
    /**
     * In order for the theme to know where you are storing your content
     * you must pass in where the posts and authors are located.
     * basePath will define where the theme is served from
     */
    {
      resolve: "gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/", // serve from the root
      },
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
```
