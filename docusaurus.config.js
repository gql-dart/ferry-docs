module.exports = {
  title: 'Ferry Graphql',
  tagline: 'A simple, powerful GraphQL Client for Flutter and Dart',
  url: 'https://ferrygraphql.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'gql-dart', // Usually your GitHub org/user name.
  projectName: 'ferry', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Ferry',
      logo: {
        alt: 'Ferry Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          to: 'examples/',
          label: 'Examples',
          href: 'https://github.com/gql-dart/ferry/tree/master/examples',
          position: 'left',
        },
        {
          href: 'https://pub.dev/packages/ferry',
          label: 'pub.dev',
          position: 'right',
        },
        {
          href: 'https://github.com/gql-dart/ferry',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: 'docs/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/G3JGkBY',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              href: 'https://pub.dev/packages/ferry',
              label: 'pub.dev',
            },
            {
              href: 'https://github.com/gql-dart/ferry',
              label: 'GitHub',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Sat Mandir Khalsa. Built with Docusaurus.`,
    },
    prism: {
      additionalLanguages: ['dart'],
    },
    algolia: {
      apiKey: '374807832430e726e5fc0d0c2ec40846',
      indexName: 'ferrygraphql',
      searchParameters: {}, // Optional (if provided by Algolia)
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/gql-dart/ferry-docs/edit/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
