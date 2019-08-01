# Gatsby Theme Novela

WIP

## Installation

```sh
  # in your Gatsby project
  yarn add @narative/gatsby-theme-novela
```

### Configuring Novela Theme Plugin

You can customize the path of the generated site or where you store your authors and posts.
This can be done through the `options` key in the `gatsby-theme-novela` object.

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

And then configuring your `gatsby-config.js` plugins to include the theme and content sources:

```js
// gatsby-config.js
plugins: [
  {
    resolve: "gatsby-theme-novela",
    options: {
      contentPosts: "content/posts",
      contentAuthors: "content/authors",
      basePath: "/",
    },
  },
];
```

## Adding Authors & Posts

Once you've setup the `gatsby-theme-novela` in your plugins you can start creating your first posts. In order to create a post you also need authors.

### Author

| Key      | Required |  Type   |
| -------- | :------: | :-----: |
| name     | required | String  |
| bio      | required | String  |
| avatar   | required |  Image  |
| featured | optional | Boolean |

```yml
- name: Dennis Brotzky
  bio: |
    Written by Dennis Brotzky who lives and works in Vancouver building useful things.
    You should follow him on Twitter.
  avatar: ./avatars/dennis-brotzky.jpg
  featured: true

- name: Thiago Costa
  bio: |
    Written by Thiago Costa who lives and works in Montreal building useful things.
    You should follow him on Twitter.
  avatar: ./avatars/thiago-costa.png
```

\*At least one Author must have `featured: true`. This author will have their Name, Bio, and Avatar visible on the home pag

### Post

| Key     | Required |    Type    |          Description          |
| ------- | :------: | :--------: | :---------------------------: |
| title   | required |   String   |      Also used for slug       |
| author  | required | String Ref | _Must match a defined Author_ |
| date    | required |    Date    |       YYYY-MM-DD format       |
| hero    | required |   Image    |                               |
| excerpt | required |   String   |      140 character limit      |

```yml
---
title: Why Narative loves Gatsby
author: Dennis Brotzky
date: 2019-04-27
hero: ./images/narative-gatsby-hero.jpg
excerpt: This is a love story about Narative and Gatsby
---
# And then under the heading YML you can insert any MDX you like
# like headings, links, code, images, etc
# This will show up in the body of your post
# ...
```

As you can see, Novela allows you to write posts in [MDX](https://mdxjs.com/). This gives you the ability
to render Markdown, Code, JSX, images and more within your post body.

### The recommended pattern for creating new posts

```
  my-gatsby-site
  └── content
    └── posts
      └── 2020-01-01-my-first-post
        ├── index.mdx
        └── images
```

From here, you can being populating `index.mx`

### Configuring siteMetadata

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

#### Example configuration

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
        basePath: "/",
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

## Future

This project is early in development and we are intersted in creating a more extensible experience with
even better features out of the box.

- Data sources such as Prismic, Sanity, Contentful, Netlify CMS, etc.
- Built in search with Algolia or similar
- Tags, categories, and more
- More theme variations
- Even more customizability
