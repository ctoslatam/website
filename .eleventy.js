const { DateTime } = require('luxon')
const cacheBuster = require('@mightyplow/eleventy-plugin-cache-buster')
const htmlmin = require('html-minifier')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const sitemap = require('@quasibit/eleventy-plugin-sitemap')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

module.exports = (eleventyConfig) => {
  eleventyConfig.setUseGitIgnore(false)

  if (process.env.ELEVENTY_PRODUCTION) {
    eleventyConfig.addPlugin(cacheBuster({}))
  }

  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: 'https://www.ctoslatam.com'
    }
  })
  eleventyConfig.addPlugin(syntaxHighlight)
  eleventyConfig.addPlugin(pluginRss)

  eleventyConfig.setDataDeepMerge(true)

  eleventyConfig.addWatchTarget('_tmp/styles.css')
  eleventyConfig.addPassthroughCopy({ '_tmp/styles.css': 'assets/styles/styles.css' })
  eleventyConfig.addPassthroughCopy('src/assets')

  eleventyConfig.addShortcode('asset_img', (filename, alt) => `<img class="my-4" src="/assets/img/posts/${filename}" alt="${alt}" />`)

  eleventyConfig.addFilter('readableDate', (dateObj) => DateTime.fromJSDate(dateObj).toFormat('dd/MM/yyyy'))
  eleventyConfig.addFilter('machineDate', (dateObj) => DateTime.fromJSDate(dateObj).toFormat('yyyy-MM-dd'))
  eleventyConfig.addFilter('readTime', (value) => {
    const content = value
    const textOnly = content.replace(/(<([^>]+)>)/gi, '')
    const readingSpeedPerMin = 450

    return Math.max(1, Math.floor(textOnly.length / readingSpeedPerMin))
  })

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: '<!-- excerpt -->'
  })

  const md = markdownIt({ linkify: true, html: true })
  md.use(markdownItAnchor)
  eleventyConfig.setLibrary('md', md)

  eleventyConfig.addCollection('tagList', (collection) => {
    const tags = collection.getFilteredByTag('post').reduce((uniqueTags, item) => new Set([...uniqueTags, ...item.data.tags]), new Set())
    tags.delete('post')
    return Array.from(tags).sort()
  })
  eleventyConfig.addCollection('authors', (collection) => collection.getFilteredByTag('post').reduce((authors, post) => {
    const { author: { name } } = post.data
    if (!name) {
      return authors
    }

    const extendenAuthors = { ...authors }
    if (name in authors) {
      extendenAuthors[name] = [...authors[name], post.data]
    } else {
      extendenAuthors[name] = [post.data]
    }
    return extendenAuthors
  }, {}))

  eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith('.html')
    ) {
      const minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      })
      return minified
    }

    return content
  })

  return { dir: { input: 'src' } }
}
