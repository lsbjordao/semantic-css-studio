import type { Theme } from './schema'

export const defaultTheme = {
  schemaVersion: 2,
  metadata: {
    name: 'Minimal',
    description: 'A calm, portable baseline for semantic HTML.',
    version: '1.0.0',
  },
  tokens: {
    colors: {
      background: '#ffffff',
      surface: '#f7f7f5',
      surfaceAlt: '#efefec',
      text: '#202124',
      textMuted: '#666a70',
      primary: '#3157d5',
      primaryHover: '#2443a8',
      primaryText: '#ffffff',
      secondary: '#6b7280',
      border: '#d8d9dc',
      success: '#19733c',
      warning: '#9a6100',
      danger: '#b42318',
      codeBackground: '#17181c',
      codeText: '#f4f4f5',
    },
    typography: {
      fontBody: 'Inter, ui-sans-serif, system-ui, sans-serif',
      fontHeading: 'Inter, ui-sans-serif, system-ui, sans-serif',
      fontMono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      fontSizeBase: '16px',
      fontSizeXs: '0.75rem',
      fontSizeSm: '0.875rem',
      fontSizeMd: '1rem',
      fontSizeLg: '1.25rem',
      fontSizeXl: '2.25rem',
      lineHeightBody: '1.65',
      lineHeightHeading: '1.15',
      fontWeightNormal: '400',
      fontWeightMedium: '600',
      fontWeightBold: '750',
    },
    radius: {
      radiusSm: '0.25rem',
      radiusMd: '0.6rem',
      radiusLg: '1rem',
      radiusFull: '999px',
    },
    shadow: {
      shadowSm: '0 1px 2px rgb(0 0 0 / 0.08)',
      shadowMd: '0 8px 24px rgb(0 0 0 / 0.10)',
      shadowLg: '0 20px 50px rgb(0 0 0 / 0.14)',
    },
    spacing: {
      spaceXs: '0.25rem',
      spaceSm: '0.5rem',
      spaceMd: '1rem',
      spaceLg: '1.5rem',
      spaceXl: '2.25rem',
      space2xl: '4rem',
      space2xlXs: '2.5rem',
    },
    layout: {
      contentWidth: '72ch',
      wideWidth: '1120px',
      bodyPadding: '1.25rem',
      sectionSpacing: '3rem',
      headerWidth: '1120px',
      footerWidth: '1120px',
      bodyPaddingSm: '1rem',
      bodyPaddingXs: '0.8rem',
      sectionSpacingSm: '2rem',
    },
    scroll: {
      scrollbarWidth: 'auto',
      scrollbarSize: '12px',
      scrollbarTrack: 'var(--color-surface)',
      scrollbarThumb: 'var(--color-border)',
      scrollbarThumbHover: 'var(--color-text-muted)',
      scrollbarRadius: 'var(--radius-full)',
      scrollbarGutter: 'auto',
      scrollBehavior: 'auto',
      scrollPaddingTop: '0',
      overscrollBehavior: 'auto',
    },
  },
  modes: {
    light: {
      colors: {},
    },
    dark: {
      colors: {
        background: '#111317',
        surface: '#181b20',
        surfaceAlt: '#23272e',
        text: '#eceef2',
        textMuted: '#a9b0ba',
        primary: '#8aa4ff',
        primaryHover: '#a9b9ff',
        primaryText: '#11162c',
        border: '#343a43',
        codeBackground: '#090a0c',
        codeText: '#f5f7fa',
      },
    },
  },
  layers: {
    base: {
      html: {
        colorScheme: 'light dark',
        background: 'var(--color-background)',
      },
      'h1, h2, h3, h4, h5, h6': {
        fontFamily: 'var(--font-heading)',
        fontWeight: 'var(--font-weight-bold)',
        lineHeight: 'var(--line-height-heading)',
        marginBlock: '1.25em 0.5em',
      },
      'p, ul, ol, dl, blockquote, pre, figure, table, form, details': {
        marginBlock: '0 var(--space-lg)',
      },
      'th, td': {
        padding: 'var(--space-sm) var(--space-md)',
        verticalAlign: 'top',
      },
      label: {
        display: 'block',
        marginBlock: 'var(--space-sm)',
      },
      'input:not([type="checkbox"]):not([type="radio"]), textarea, select': {
        width: '100%',
      },
      'input, textarea, select, button': {
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        color: 'var(--color-text)',
        font: 'inherit',
        padding: '0.65rem 0.8rem',
      },
      button: {
        background: 'var(--color-primary)',
        color: 'var(--color-primary-text)',
      },
    },
    elements: {
      // Sobreposicao contextual de `code`: neutraliza o chrome do codigo inline
      // dentro de um <pre>. Precisa da camada elements — em `base` sairia como
      // `:where(pre code)`, especificidade 0, e perderia para `code`.
      'pre code': {
        background: 'transparent',
        color: 'inherit',
        padding: '0',
      },
      body: {
        margin: '0',
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-text)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--font-size-base)',
        lineHeight: 'var(--line-height-body)',
      },
      header: {
        maxWidth: 'var(--header-width)',
        marginInline: 'auto',
        padding: 'var(--space-lg) var(--body-padding)',
      },
      nav: {
        display: 'flex',
        gap: 'var(--space-md)',
        alignItems: 'center',
        flexWrap: 'wrap',
      },
      main: {
        maxWidth: 'var(--content-width)',
        marginInline: 'auto',
        padding: 'var(--space-lg) var(--body-padding) var(--space-2xl)',
      },
      section: {
        marginBlock: 'var(--section-spacing)',
      },
      article: {
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-lg)',
        boxShadow: 'var(--shadow-sm)',
      },
      aside: {
        borderInlineStart: '4px solid var(--color-primary)',
        backgroundColor: 'var(--color-surface)',
        padding: 'var(--space-md)',
      },
      footer: {
        maxWidth: 'var(--footer-width)',
        marginInline: 'auto',
        padding: 'var(--space-xl) var(--body-padding)',
        color: 'var(--color-text-muted)',
        borderTop: '1px solid var(--color-border)',
      },
      h1: {
        fontSize: 'clamp(2.2rem, 7vw, 4.25rem)',
      },
      h2: {
        fontSize: 'clamp(1.7rem, 5vw, 2.6rem)',
      },
      h3: {
        fontSize: '1.5rem',
      },
      h4: {
        fontSize: '1.25rem',
      },
      h5: {
        fontSize: '1.05rem',
      },
      h6: {
        fontSize: '0.95rem',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      },
      a: {
        color: 'var(--color-primary)',
        textUnderlineOffset: '0.2em',
      },
      mark: {
        backgroundColor:
          'color-mix(in srgb, var(--color-warning) 25%, transparent)',
        color: 'inherit',
      },
      blockquote: {
        marginInline: '0',
        padding: 'var(--space-md) var(--space-lg)',
        borderInlineStart: '4px solid var(--color-primary)',
        color: 'var(--color-text-muted)',
      },
      hr: {
        border: '0',
        borderTop: '1px solid var(--color-border)',
        marginBlock: 'var(--space-xl)',
      },
      code: {
        fontFamily: 'var(--font-mono)',
        backgroundColor: 'var(--color-surface-alt)',
        borderRadius: 'var(--radius-sm)',
        padding: '0.1em 0.35em',
      },
      pre: {
        backgroundColor: 'var(--color-code-background)',
        color: 'var(--color-code-text)',
        padding: 'var(--space-lg)',
        borderRadius: 'var(--radius-md)',
        overflowX: 'auto',
      },
      kbd: {
        fontFamily: 'var(--font-mono)',
        border: '1px solid var(--color-border)',
        borderBottomWidth: '3px',
        borderRadius: 'var(--radius-sm)',
        padding: '0.12rem 0.4rem',
        backgroundColor: 'var(--color-surface)',
      },
      table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBlock: 'var(--space-lg)',
      },
      th: {
        textAlign: 'left',
        backgroundColor: 'var(--color-surface)',
      },
      td: {
        borderTop: '1px solid var(--color-border)',
      },
      caption: {
        color: 'var(--color-text-muted)',
        marginBottom: 'var(--space-sm)',
        textAlign: 'left',
      },
      fieldset: {
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-lg)',
      },
      input: {
        boxSizing: 'border-box',
      },
      textarea: {
        width: '100%',
        boxSizing: 'border-box',
        minHeight: '7rem',
        resize: 'vertical',
      },
      select: {
        width: '100%',
        boxSizing: 'border-box',
      },
      button: {
        cursor: 'pointer',
        fontWeight: 'var(--font-weight-medium)',
      },
      img: {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: 'var(--radius-md)',
      },
      figure: {
        marginInline: '0',
      },
      figcaption: {
        color: 'var(--color-text-muted)',
        fontSize: 'var(--font-size-sm)',
      },
      details: {
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-md)',
      },
      summary: {
        cursor: 'pointer',
        fontWeight: 'var(--font-weight-medium)',
      },
    },
    states: {
      'a:hover': {
        color: 'var(--color-primary-hover)',
      },
      'a:focus-visible': {
        outline:
          '3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)',
        outlineOffset: '3px',
      },
      'button:hover': {
        backgroundColor: 'var(--color-primary-hover)',
      },
      'button:focus-visible': {
        outline:
          '3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)',
        outlineOffset: '3px',
      },
      'button:active': {
        transform: 'translateY(1px)',
      },
      'button:disabled': {
        opacity: '0.55',
        cursor: 'not-allowed',
      },
      'input:focus-visible': {
        outline:
          '3px solid color-mix(in srgb, var(--color-primary) 35%, transparent)',
        borderColor: 'var(--color-primary)',
      },
      'input:disabled': {
        opacity: '0.6',
        cursor: 'not-allowed',
      },
      'input:checked': {
        accentColor: 'var(--color-primary)',
      },
    },
    responsive: {
      tablet: {
        ':root': {
          '--body-padding': 'var(--body-padding-sm)',
          '--section-spacing': 'var(--section-spacing-sm)',
        },
        table: {
          fontSize: 'var(--font-size-sm)',
        },
      },
      mobile: {
        ':root': {
          '--body-padding': 'var(--body-padding-xs)',
          '--space-2xl': 'var(--space-2xl-xs)',
        },
        h1: {
          overflowWrap: 'anywhere',
        },
      },
    },
  },
  breakpoints: {
    mobile: 390,
    tablet: 768,
    desktop: 1440,
  },
  icons: {
    library: 'none',
  },
  options: {
    includeMinimalReset: true,
    reducedMotion: true,
  },
} satisfies Theme
