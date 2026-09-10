import type { Theme } from '../schema'

export const minimalPreset = {
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
  options: {
    includeMinimalReset: true,
    reducedMotion: true,
  },
} satisfies Theme

export const editorialPreset = {
  schemaVersion: 2,
  metadata: {
    name: 'Editorial',
    description:
      'A serif-forward theme for essays, magazines and long-form reading.',
    version: '1.0.0',
  },
  tokens: {
    colors: {
      background: '#fbf8f1',
      surface: '#fffdf8',
      surfaceAlt: '#eee7da',
      text: '#2e281f',
      textMuted: '#776b5a',
      primary: '#9b351f',
      primaryHover: '#702516',
      primaryText: '#ffffff',
      secondary: '#6b7280',
      border: '#d9cfbf',
      success: '#19733c',
      warning: '#9a6100',
      danger: '#b42318',
      codeBackground: '#17181c',
      codeText: '#f4f4f5',
    },
    typography: {
      fontBody: 'Georgia, Cambria, Times New Roman, serif',
      fontHeading: 'Georgia, Cambria, Times New Roman, serif',
      fontMono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      fontSizeBase: '18px',
      fontSizeXs: '0.75rem',
      fontSizeSm: '0.875rem',
      fontSizeMd: '1rem',
      fontSizeLg: '1.25rem',
      fontSizeXl: '2.25rem',
      lineHeightBody: '1.75',
      lineHeightHeading: '1.05',
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
      contentWidth: '66ch',
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
        background: '#181510',
        surface: '#201c16',
        surfaceAlt: '#2b251c',
        text: '#f2eadc',
        textMuted: '#b9ac99',
        primary: '#ff9576',
        primaryHover: '#ffb19b',
        primaryText: '#11162c',
        border: '#453c31',
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
        backgroundColor: 'transparent',
        border: '0',
        padding: '0',
        boxShadow: 'none',
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
        fontSize: 'clamp(2.8rem, 8vw, 5.8rem)',
        letterSpacing: '-0.045em',
      },
      h2: {
        fontSize: 'clamp(2rem, 5vw, 3.4rem)',
        letterSpacing: '-0.03em',
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
        fontSize: '1.2em',
        fontStyle: 'italic',
        borderInlineStart: '0',
        borderBlock: '1px solid var(--color-border)',
        padding: 'var(--space-lg) 0',
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
  options: {
    includeMinimalReset: true,
    reducedMotion: true,
  },
} satisfies Theme

export const documentationPreset = {
  schemaVersion: 2,
  metadata: {
    name: 'Documentation',
    description: 'Crisp sans-serif styling for technical documentation.',
    version: '1.0.0',
  },
  tokens: {
    colors: {
      background: '#f8fafc',
      surface: '#ffffff',
      surfaceAlt: '#eef2f7',
      text: '#172033',
      textMuted: '#596579',
      primary: '#0a68d8',
      primaryHover: '#0753ad',
      primaryText: '#ffffff',
      secondary: '#6b7280',
      border: '#d8e0eb',
      success: '#19733c',
      warning: '#9a6100',
      danger: '#b42318',
      codeBackground: '#0d1726',
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
      radiusMd: '0.35rem',
      radiusLg: '0.5rem',
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
      contentWidth: '78ch',
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
        background: '#0f1724',
        surface: '#151f2e',
        surfaceAlt: '#1d2a3b',
        text: '#e8edf5',
        textMuted: '#a5b1c2',
        primary: '#78b7ff',
        primaryHover: '#a5ceff',
        primaryText: '#11162c',
        border: '#2c3b50',
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
        padding: 'var(--space-xl)',
        boxShadow: 'none',
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
        fontSize: '2.75rem',
        letterSpacing: '-0.035em',
      },
      h2: {
        fontSize: '1.8rem',
        borderBottom: '1px solid var(--color-border)',
        paddingBottom: '0.35em',
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
  options: {
    includeMinimalReset: true,
    reducedMotion: true,
  },
} satisfies Theme

export const academicPreset = {
  schemaVersion: 2,
  metadata: {
    name: 'Academic',
    description:
      'Reserved typography and spacing for papers and scholarly notes.',
    version: '1.0.0',
  },
  tokens: {
    colors: {
      background: '#fffefe',
      surface: '#ffffff',
      surfaceAlt: '#f4f4f4',
      text: '#111111',
      textMuted: '#555555',
      primary: '#174a7e',
      primaryHover: '#0f345a',
      primaryText: '#ffffff',
      secondary: '#6b7280',
      border: '#cfcfcf',
      success: '#19733c',
      warning: '#9a6100',
      danger: '#b42318',
      codeBackground: '#17181c',
      codeText: '#f4f4f5',
    },
    typography: {
      fontBody: 'Charter, Georgia, Times New Roman, serif',
      fontHeading: 'Charter, Georgia, Times New Roman, serif',
      fontMono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      fontSizeBase: '17px',
      fontSizeXs: '0.75rem',
      fontSizeSm: '0.875rem',
      fontSizeMd: '1rem',
      fontSizeLg: '1.25rem',
      fontSizeXl: '2.25rem',
      lineHeightBody: '1.7',
      lineHeightHeading: '1.15',
      fontWeightNormal: '400',
      fontWeightMedium: '600',
      fontWeightBold: '750',
    },
    radius: {
      radiusSm: '0',
      radiusMd: '0',
      radiusLg: '0',
      radiusFull: '999px',
    },
    shadow: {
      shadowSm: 'none',
      shadowMd: 'none',
      shadowLg: 'none',
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
      contentWidth: '70ch',
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
        backgroundColor: 'transparent',
        border: '0',
        borderRadius: '0',
        padding: '0',
        boxShadow: 'none',
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
        fontSize: '2.4rem',
        textAlign: 'center',
      },
      h2: {
        fontSize: '1.6rem',
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
        borderInlineStart: '2px solid var(--color-border)',
        fontSize: '0.96em',
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
  options: {
    includeMinimalReset: true,
    reducedMotion: true,
  },
} satisfies Theme

export const terminalPreset = {
  schemaVersion: 2,
  metadata: {
    name: 'Terminal',
    description: 'A monochrome, command-line inspired semantic theme.',
    version: '1.0.0',
  },
  tokens: {
    colors: {
      background: '#071009',
      surface: '#0b160d',
      surfaceAlt: '#112017',
      text: '#b9f7c2',
      textMuted: '#75a97e',
      primary: '#74f38a',
      primaryHover: '#a6ffb5',
      primaryText: '#061008',
      secondary: '#66c877',
      border: '#244d2d',
      success: '#74f38a',
      warning: '#e0d06c',
      danger: '#ff817e',
      codeBackground: '#030804',
      codeText: '#c9ffd1',
    },
    typography: {
      fontBody: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      fontHeading: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      fontMono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      fontSizeBase: '15px',
      fontSizeXs: '0.75rem',
      fontSizeSm: '0.875rem',
      fontSizeMd: '1rem',
      fontSizeLg: '1.25rem',
      fontSizeXl: '2.25rem',
      lineHeightBody: '1.55',
      lineHeightHeading: '1.15',
      fontWeightNormal: '400',
      fontWeightMedium: '600',
      fontWeightBold: '700',
    },
    radius: {
      radiusSm: '0',
      radiusMd: '0',
      radiusLg: '0',
      radiusFull: '999px',
    },
    shadow: {
      shadowSm: 'none',
      shadowMd: 'none',
      shadowLg: 'none',
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
        background: '#071009',
        surface: '#0b160d',
        surfaceAlt: '#112017',
        text: '#b9f7c2',
        textMuted: '#75a97e',
        primary: '#74f38a',
        primaryHover: '#a6ffb5',
        primaryText: '#061008',
        border: '#244d2d',
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
        borderRadius: '0',
        padding: 'var(--space-lg)',
        boxShadow: 'none',
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
        fontSize: '2.1rem',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      },
      h2: {
        fontSize: '1.4rem',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
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
        textDecoration: 'none',
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
  options: {
    includeMinimalReset: true,
    reducedMotion: true,
  },
} satisfies Theme

export const simpleCssPreset = {
  schemaVersion: 2,
  metadata: {
    name: 'Simple.css',
    description:
      'An editable preset based on Kev Quirk’s Simple.css classless framework.',
    author: 'Kev Quirk / Simple.css contributors',
    version: '1.0.0',
  },
  tokens: {
    colors: {
      background: '#ffffff',
      surface: '#f5f7ff',
      surfaceAlt: '#f5f7ff',
      text: '#212121',
      textMuted: '#585858',
      primary: '#0d47a1',
      primaryHover: '#1266e2',
      primaryText: '#ffffff',
      secondary: '#585858',
      border: '#898ea4',
      success: '#19733c',
      warning: '#ffdd33',
      danger: '#d81b60',
      codeBackground: '#f5f7ff',
      codeText: '#444444',
    },
    typography: {
      fontBody:
        '-apple-system, BlinkMacSystemFont, "Avenir Next", Avenir, "Nimbus Sans L", Roboto, "Noto Sans", "Segoe UI", Arial, Helvetica, "Helvetica Neue", sans-serif',
      fontHeading:
        '-apple-system, BlinkMacSystemFont, "Avenir Next", Avenir, "Nimbus Sans L", Roboto, "Noto Sans", "Segoe UI", Arial, Helvetica, "Helvetica Neue", sans-serif',
      fontMono:
        'Consolas, Menlo, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
      fontSizeBase: '1.15rem',
      fontSizeXs: '0.9rem',
      fontSizeSm: '0.96rem',
      fontSizeMd: '1.15rem',
      fontSizeLg: '1.44rem',
      fontSizeXl: '3rem',
      lineHeightBody: '1.5',
      lineHeightHeading: '1.1',
      fontWeightNormal: '400',
      fontWeightMedium: '600',
      fontWeightBold: '700',
    },
    radius: {
      radiusSm: '5px',
      radiusMd: '5px',
      radiusLg: '5px',
      radiusFull: '999px',
    },
    shadow: {
      shadowSm: 'none',
      shadowMd: 'none',
      shadowLg: 'none',
    },
    spacing: {
      spaceXs: '0.25rem',
      spaceSm: '0.5rem',
      spaceMd: '1rem',
      spaceLg: '1.5rem',
      spaceXl: '2rem',
      space2xl: '4rem',
      space2xlXs: '2.5rem',
    },
    layout: {
      contentWidth: '45rem',
      wideWidth: '1200px',
      bodyPadding: '0.5rem',
      sectionSpacing: '3rem',
      headerWidth: '1200px',
      footerWidth: '45rem',
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
      scrollBehavior: 'smooth',
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
        background: '#212121',
        surface: '#2b2b2b',
        surfaceAlt: '#111111',
        text: '#dcdcdc',
        textMuted: '#ababab',
        primary: '#ffb300',
        primaryHover: '#ffe099',
        primaryText: '#212121',
        border: '#343a43',
        codeBackground: '#2b2b2b',
        codeText: '#cccccc',
        danger: '#f06292',
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
      body: {
        color: 'var(--color-text)',
        backgroundColor: 'var(--color-background)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--font-size-base)',
        lineHeight: 'var(--line-height-body)',
        display: 'grid',
        gridTemplateColumns: '1fr min(45rem, 90%) 1fr',
        margin: '0',
      },
      header: {},
      nav: {},
      main: {
        paddingTop: '1.5rem',
      },
      section: {
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        padding: '2rem 1rem',
        margin: '3rem 0',
      },
      article: {
        border: '1px solid var(--color-border)',
        padding: '1rem',
        borderRadius: 'var(--radius-md)',
        marginBottom: '1rem',
        backgroundColor: 'transparent',
        boxShadow: 'none',
      },
      aside: {
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        marginBottom: '1rem',
        fontSize: '1rem',
        width: '30%',
        padding: '0 15px',
        marginInlineStart: '15px',
        float: 'right',
      },
      footer: {},
      h1: {
        fontSize: '3rem',
        lineHeight: '1.1',
        overflowWrap: 'break-word',
      },
      h2: {
        fontSize: '2.6rem',
        marginTop: '3rem',
        lineHeight: '1.1',
        overflowWrap: 'break-word',
      },
      h3: {
        fontSize: '2rem',
        marginTop: '3rem',
        lineHeight: '1.1',
        overflowWrap: 'break-word',
      },
      h4: {
        fontSize: '1.44rem',
        overflowWrap: 'break-word',
      },
      h5: {
        fontSize: '1.15rem',
        overflowWrap: 'break-word',
      },
      h6: {
        fontSize: '0.96rem',
        overflowWrap: 'break-word',
      },
      a: {
        color: 'var(--color-primary)',
      },
      mark: {
        padding: '2px 5px',
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--color-warning)',
        color: 'black',
      },
      blockquote: {
        marginInlineStart: '2rem',
        marginInlineEnd: '0',
        marginBlock: '2rem',
        padding: '0.4rem 0.8rem',
        borderInlineStart: '0.35rem solid var(--color-primary)',
        color: 'var(--color-text-muted)',
        fontStyle: 'italic',
      },
      hr: {
        border: 'none',
        height: '1px',
        background: 'var(--color-border)',
        margin: '1rem auto',
      },
      code: {
        fontFamily: 'var(--font-mono)',
        color: 'var(--color-danger)',
        backgroundColor: 'transparent',
        padding: '0',
      },
      pre: {
        fontFamily: 'var(--font-mono)',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        marginBottom: '1rem',
        padding: '1rem 1.4rem',
        maxWidth: '100%',
        overflow: 'auto',
        color: 'var(--color-code-text)',
      },
      kbd: {
        fontFamily: 'var(--font-mono)',
        color: 'var(--color-code-text)',
        border: '1px solid var(--color-code-text)',
        borderBottom: '3px solid var(--color-code-text)',
        borderRadius: 'var(--radius-md)',
        padding: '0.1rem 0.4rem',
      },
      table: {
        borderCollapse: 'collapse',
        margin: '1.5rem 0',
      },
      th: {
        backgroundColor: 'var(--color-surface)',
        fontWeight: 'bold',
        textAlign: 'start',
        border: '1px solid var(--color-border)',
        padding: '0.5rem',
      },
      td: {
        border: '1px solid var(--color-border)',
        textAlign: 'start',
        padding: '0.5rem',
      },
      caption: {
        fontWeight: 'bold',
        marginBottom: '0.5rem',
        textAlign: 'start',
        color: 'var(--color-text)',
      },
      fieldset: {
        border: '1px solid var(--color-border)',
        padding: '1rem',
        borderRadius: 'var(--radius-md)',
        marginBottom: '1rem',
      },
      input: {
        color: 'var(--color-text)',
        backgroundColor: 'var(--color-background)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'none',
        maxWidth: '100%',
        display: 'inline-block',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        padding: '0.5em',
        marginBottom: '0.5rem',
      },
      textarea: {
        color: 'var(--color-text)',
        backgroundColor: 'var(--color-background)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'none',
        maxWidth: '100%',
        width: '100%',
        display: 'inline-block',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        padding: '0.5em',
        marginBottom: '0.5rem',
      },
      select: {
        color: 'var(--color-text)',
        backgroundColor: 'var(--color-background)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'none',
        maxWidth: '100%',
        display: 'inline-block',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        padding: '0.5em',
        marginBottom: '0.5rem',
      },
      button: {
        border: '1px solid var(--color-primary)',
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--color-primary)',
        color: 'var(--color-primary-text)',
        padding: '0.5rem 0.9rem',
        marginBottom: '0.5rem',
        textDecoration: 'none',
        lineHeight: 'normal',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        boxShadow: 'none',
        maxWidth: '100%',
        display: 'inline-block',
        fontWeight: '400',
      },
      img: {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: 'var(--radius-md)',
      },
      figure: {
        margin: '0',
        display: 'block',
        overflowX: 'auto',
      },
      figcaption: {
        position: 'sticky',
        left: '0',
        textAlign: 'center',
        fontSize: '0.9rem',
        color: 'var(--color-text-muted)',
        marginBlock: '1rem',
      },
      details: {
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        marginBottom: '1rem',
        padding: '0.7rem 1rem',
      },
      summary: {
        cursor: 'pointer',
        fontWeight: 'bold',
        padding: '0.7rem 1rem',
        margin: '-0.7rem -1rem',
        wordBreak: 'break-all',
      },
      html: {
        fontFamily: 'var(--font-body)',
        colorScheme: 'normal',
        background: 'initial',
      },
      'body > *': {
        gridColumn: '2',
      },
      'body > header': {
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        textAlign: 'center',
        padding: '0 0.5rem 2rem 0.5rem',
        gridColumn: '1 / -1',
      },
      'body > header > *:only-child': {
        marginBlockStart: '2rem',
      },
      'body > header h1': {
        maxWidth: '1200px',
        margin: '1rem auto',
      },
      'body > header p': {
        maxWidth: '40rem',
        margin: '1rem auto',
      },
      'body > footer': {
        marginTop: '4rem',
        padding: '2rem 1rem 1.5rem 1rem',
        color: 'var(--color-text-muted)',
        fontSize: '0.9rem',
        textAlign: 'center',
        borderTop: '1px solid var(--color-border)',
      },
      p: {
        margin: '1.5rem 0',
        overflowWrap: 'break-word',
      },
      'header nav': {
        fontSize: '1rem',
        lineHeight: '2',
        padding: '1rem 0 0 0',
      },
      'header nav ul, header nav ol': {
        alignContent: 'space-around',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        listStyleType: 'none',
        margin: '0',
        padding: '0',
      },
      'header nav ul li, header nav ol li': {
        display: 'inline-block',
      },
      'header nav a, header nav a:visited': {
        margin: '0 0.5rem 1rem 0.5rem',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-text)',
        display: 'inline-block',
        padding: '0.1rem 1rem',
        textDecoration: 'none',
      },
      'td, th': {
        border: '1px solid var(--color-border)',
        textAlign: 'start',
        padding: '0.5rem',
      },
      'tr:nth-child(even)': {
        backgroundColor: 'var(--color-surface)',
      },
      dialog: {
        backgroundColor: 'var(--color-background)',
        maxWidth: '40rem',
        margin: 'auto',
        border: '1px solid var(--color-border)',
        padding: '1rem',
        borderRadius: 'var(--radius-md)',
      },
      label: {
        display: 'block',
      },
      abbr: {
        cursor: 'help',
        textDecorationLine: 'underline',
        textDecorationStyle: 'dotted',
      },
      video: {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: 'var(--radius-md)',
      },
      cite: {
        fontSize: '0.9rem',
        color: 'var(--color-text-muted)',
        fontStyle: 'normal',
      },
      dt: {
        color: 'var(--color-text-muted)',
      },
      samp: {
        fontFamily: 'var(--font-mono)',
        color: 'var(--color-danger)',
      },
      'pre code': {
        color: 'var(--color-code-text)',
        background: 'none',
        margin: '0',
        padding: '0',
      },
      progress: {
        width: '100%',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        marginBottom: '1rem',
      },
      sup: {
        verticalAlign: 'baseline',
        position: 'relative',
        top: '-0.4em',
      },
      sub: {
        verticalAlign: 'baseline',
        position: 'relative',
        top: '0.3em',
      },
    },
    states: {
      'a:hover': {
        textDecoration: 'none',
      },
      'a:focus-visible': {
        outline: '2px solid var(--color-primary)',
        outlineOffset: '1px',
      },
      'button:hover': {
        backgroundColor: 'var(--color-primary-hover)',
        borderColor: 'var(--color-primary-hover)',
        cursor: 'pointer',
      },
      'button:focus-visible': {
        outline: '2px solid var(--color-primary)',
        outlineOffset: '1px',
      },
      'button:disabled': {
        cursor: 'not-allowed',
        backgroundColor: 'var(--color-surface-alt)',
        borderColor: 'var(--color-surface-alt)',
        color: 'var(--color-text-muted)',
      },
      'input:disabled': {
        cursor: 'not-allowed',
        backgroundColor: 'var(--color-surface-alt)',
        borderColor: 'var(--color-surface-alt)',
        color: 'var(--color-text-muted)',
      },
      'input:checked': {
        backgroundColor: 'var(--color-primary)',
      },
      'textarea:disabled': {
        cursor: 'not-allowed',
        backgroundColor: 'var(--color-surface-alt)',
        borderColor: 'var(--color-surface-alt)',
        color: 'var(--color-text-muted)',
      },
      'select:disabled': {
        cursor: 'not-allowed',
        backgroundColor: 'var(--color-surface-alt)',
        borderColor: 'var(--color-surface-alt)',
        color: 'var(--color-text-muted)',
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
    mobile: 720,
    tablet: 720,
    desktop: 1440,
  },
  options: {
    includeMinimalReset: true,
    reducedMotion: true,
  },
} satisfies Theme

export const noirPreset = {
  schemaVersion: 2,
  metadata: {
    name: 'Noir',
    description:
      'A dark, editorial theme with champagne accents and serif display type.',
    version: '1.0.0',
  },
  tokens: {
    colors: {
      background: '#141210',
      surface: '#1d1a16',
      surfaceAlt: '#26211b',
      text: '#ece5d8',
      textMuted: '#a89c86',
      primary: '#d9b36a',
      primaryHover: '#e8c987',
      primaryText: '#1a1409',
      secondary: '#8a7f6a',
      border: '#38312a',
      success: '#9dc08b',
      warning: '#d9a441',
      danger: '#e08073',
      codeBackground: '#0d0b09',
      codeText: '#f0e8d5',
    },
    typography: {
      fontBody: 'Inter, ui-sans-serif, system-ui, sans-serif',
      fontHeading: 'Didot, "Bodoni MT", "Playfair Display", Georgia, serif',
      fontMono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      fontSizeBase: '16px',
      fontSizeXs: '0.75rem',
      fontSizeSm: '0.875rem',
      fontSizeMd: '1rem',
      fontSizeLg: '1.25rem',
      fontSizeXl: '2.25rem',
      lineHeightBody: '1.7',
      lineHeightHeading: '1.1',
      fontWeightNormal: '400',
      fontWeightMedium: '600',
      fontWeightBold: '750',
    },
    radius: {
      radiusSm: '0.25rem',
      radiusMd: '0.5rem',
      radiusLg: '0.9rem',
      radiusFull: '999px',
    },
    shadow: {
      shadowSm: '0 1px 2px rgb(0 0 0 / 0.35)',
      shadowMd: '0 12px 32px rgb(0 0 0 / 0.38)',
      shadowLg: '0 24px 60px rgb(0 0 0 / 0.45)',
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
        background: '#100e0c',
        surface: '#171310',
        surfaceAlt: '#201a14',
        text: '#ece5d8',
        textMuted: '#a89c86',
        primary: '#d9b36a',
        primaryHover: '#e8c987',
        primaryText: '#1a1409',
        border: '#2e2822',
        codeBackground: '#0d0b09',
        codeText: '#f0e8d5',
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
        fontSize: 'clamp(2.4rem, 7vw, 4.5rem)',
        letterSpacing: '-0.02em',
      },
      h2: {
        fontSize: 'clamp(1.8rem, 4.5vw, 2.9rem)',
        letterSpacing: '-0.015em',
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
        borderInlineStart: '2px solid var(--color-primary)',
        color: 'var(--color-text)',
        fontSize: '1.15em',
        fontStyle: 'italic',
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
  options: {
    includeMinimalReset: true,
    reducedMotion: true,
  },
} satisfies Theme

export const porcelainPreset = {
  schemaVersion: 2,
  metadata: {
    name: 'Porcelain',
    description:
      'Warm paper, terracotta accents and serif headlines for long reads.',
    version: '1.0.0',
  },
  tokens: {
    colors: {
      background: '#faf7f1',
      surface: '#f3eee4',
      surfaceAlt: '#e9e1d2',
      text: '#2b2620',
      textMuted: '#6a5c48',
      primary: '#b4552d',
      primaryHover: '#93431f',
      primaryText: '#fffaf3',
      secondary: '#7d7466',
      border: '#ded4c2',
      success: '#5d7f4f',
      warning: '#a86e12',
      danger: '#b03a2e',
      codeBackground: '#2b2620',
      codeText: '#f5efe2',
    },
    typography: {
      fontBody: 'Georgia, Cambria, Times New Roman, serif',
        fontHeading: 'Fraunces, Georgia, serif',
      fontMono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      fontSizeBase: '18px',
      fontSizeXs: '0.75rem',
      fontSizeSm: '0.875rem',
      fontSizeMd: '1rem',
      fontSizeLg: '1.25rem',
      fontSizeXl: '2.25rem',
      lineHeightBody: '1.75',
      lineHeightHeading: '1.05',
      fontWeightNormal: '400',
      fontWeightMedium: '600',
      fontWeightBold: '750',
    },
    radius: {
      radiusSm: '0.25rem',
      radiusMd: '0.75rem',
      radiusLg: '1.25rem',
      radiusFull: '999px',
    },
    shadow: {
      shadowSm: '0 1px 2px rgb(80 60 30 / 0.10)',
      shadowMd: '0 10px 28px rgb(80 60 30 / 0.12)',
      shadowLg: '0 24px 55px rgb(80 60 30 / 0.16)',
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
      contentWidth: '66ch',
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
        background: '#1c1814',
        surface: '#241f18',
        surfaceAlt: '#2e271d',
        text: '#efe7d7',
        textMuted: '#b3a48c',
        primary: '#d08a4e',
        primaryHover: '#df9c60',
        primaryText: '#241207',
        border: '#3a3227',
        codeBackground: '#100d0a',
        codeText: '#f2e9d6',
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
        backgroundColor: 'transparent',
        border: '0',
        padding: '0',
        boxShadow: 'none',
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
        fontSize: 'clamp(2.8rem, 8vw, 5.8rem)',
        letterSpacing: '-0.02em',
      },
      h2: {
        fontSize: 'clamp(2rem, 5vw, 3.4rem)',
        letterSpacing: '-0.03em',
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
        fontSize: '1.2em',
        fontStyle: 'italic',
        borderInlineStart: '3px solid var(--color-primary)',
        borderBlock: '0',
        padding: 'var(--space-md) var(--space-lg)',
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
  options: {
    includeMinimalReset: true,
    reducedMotion: true,
  },
  fonts: {
    heading: {
      family: 'Fraunces',
      weights: [400, 600, 700],
      italic: true,
    },
  },
} satisfies Theme

export const sagePreset = {
  schemaVersion: 2,
  metadata: {
    name: 'Sage',
    description:
      'A cool botanical light theme with deep-green accents and crisp grotesque type.',
    version: '1.0.0',
  },
  tokens: {
    colors: {
      background: '#f4f6f3',
      surface: '#e9ede6',
      surfaceAlt: '#dde4d8',
      text: '#232b24',
      textMuted: '#57685b',
      primary: '#3f6b4f',
      primaryHover: '#2f5440',
      primaryText: '#f4f8f2',
      secondary: '#64766a',
      border: '#cfd8cc',
      success: '#3f6b4f',
      warning: '#96702a',
      danger: '#a8443a',
      codeBackground: '#232b24',
      codeText: '#e6eee4',
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
      radiusSm: '0.375rem',
      radiusMd: '0.625rem',
      radiusLg: '1rem',
      radiusFull: '999px',
    },
    shadow: {
      shadowSm: '0 1px 2px rgb(30 50 35 / 0.10)',
      shadowMd: '0 10px 28px rgb(30 50 35 / 0.12)',
      shadowLg: '0 24px 55px rgb(30 50 35 / 0.16)',
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
        background: '#131814',
        surface: '#1a211c',
        surfaceAlt: '#232c25',
        text: '#e4eae2',
        textMuted: '#9fada1',
        primary: '#8fbf9a',
        primaryHover: '#aad4b4',
        primaryText: '#0f1a12',
        border: '#2c362e',
        codeBackground: '#0c100d',
        codeText: '#e8f0e6',
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
        letterSpacing: '-0.025em',
      },
      h2: {
        fontSize: 'clamp(1.7rem, 5vw, 2.6rem)',
        letterSpacing: '-0.02em',
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
  options: {
    includeMinimalReset: true,
    reducedMotion: true,
  },
} satisfies Theme

export const acaiPreset = {
  schemaVersion: 2,
  metadata: {
    name: 'Açaí',
    description:
      'Deep berry purples with vibrant orchid accents for a bold dark theme.',
    version: '1.0.0',
  },
  tokens: {
    colors: {
      background: '#17121f',
      surface: '#201831',
      surfaceAlt: '#2a2040',
      text: '#efe8f7',
      textMuted: '#a79ec2',
      primary: '#b388e6',
      primaryHover: '#c6a4ee',
      primaryText: '#221031',
      secondary: '#8d7fa8',
      border: '#3a2d55',
      success: '#9ccb8f',
      warning: '#e0b45c',
      danger: '#ef8f8a',
      codeBackground: '#100b18',
      codeText: '#f0e6fa',
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
      lineHeightBody: '1.7',
      lineHeightHeading: '1.08',
      fontWeightNormal: '400',
      fontWeightMedium: '600',
      fontWeightBold: '750',
    },
    radius: {
      radiusSm: '0.375rem',
      radiusMd: '0.75rem',
      radiusLg: '1.25rem',
      radiusFull: '999px',
    },
    shadow: {
      shadowSm: '0 1px 2px rgb(10 4 24 / 0.5)',
      shadowMd: '0 12px 32px rgb(60 30 110 / 0.45)',
      shadowLg: '0 24px 60px rgb(60 30 110 / 0.5)',
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
        background: '#120d1a',
        surface: '#1a1328',
        surfaceAlt: '#241a36',
        text: '#efe8f7',
        textMuted: '#a79ec2',
        primary: '#b388e6',
        primaryHover: '#c6a4ee',
        primaryText: '#221031',
        border: '#33264c',
        codeBackground: '#0c0812',
        codeText: '#f0e6fa',
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
        fontSize: 'clamp(2.4rem, 7vw, 4.4rem)',
        letterSpacing: '-0.03em',
      },
      h2: {
        fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
        letterSpacing: '-0.02em',
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
        borderInlineStart: '3px solid var(--color-primary)',
        color: 'var(--color-text)',
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontStyle: 'italic',
        fontSize: '1.15em',
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
  options: {
    includeMinimalReset: true,
    reducedMotion: true,
  },
} satisfies Theme

export const acaiBananaPreset = {
  schemaVersion: 2,
  metadata: {
    name: 'Açaí com Banana',
    description: 'Deep açaí purples with banana-yellow letters and accents.',
    version: '1.0.0',
  },
  tokens: {
    colors: {
      background: '#1a1026',
      surface: '#251737',
      surfaceAlt: '#302045',
      text: '#f6efdc',
      textMuted: '#b3a3c7',
      primary: '#f2c42c',
      primaryHover: '#ffd94d',
      primaryText: '#2a1230',
      secondary: '#a08fb5',
      border: '#3d2a58',
      success: '#9ccb8f',
      warning: '#f2c42c',
      danger: '#ef8f8a',
      codeBackground: '#120a1c',
      codeText: '#f7ecd2',
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
      lineHeightBody: '1.7',
      lineHeightHeading: '1.08',
      fontWeightNormal: '400',
      fontWeightMedium: '600',
      fontWeightBold: '750',
    },
    radius: {
      radiusSm: '0.375rem',
      radiusMd: '0.75rem',
      radiusLg: '1.25rem',
      radiusFull: '999px',
    },
    shadow: {
      shadowSm: '0 1px 2px rgb(10 4 24 / 0.5)',
      shadowMd: '0 12px 32px rgb(60 30 110 / 0.45)',
      shadowLg: '0 24px 60px rgb(60 30 110 / 0.5)',
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
        background: '#130b1d',
        surface: '#1d1229',
        surfaceAlt: '#281a38',
        text: '#f6efdc',
        textMuted: '#b3a3c7',
        primary: '#f2c42c',
        primaryHover: '#ffd94d',
        primaryText: '#2a1230',
        border: '#36234e',
        codeBackground: '#0d0714',
        codeText: '#f7ecd2',
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
        fontSize: 'clamp(2.4rem, 7vw, 4.4rem)',
        letterSpacing: '-0.03em',
      },
      h2: {
        fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
        letterSpacing: '-0.02em',
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
        borderInlineStart: '3px solid var(--color-primary)',
        color: 'var(--color-text)',
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontStyle: 'italic',
        fontSize: '1.15em',
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
  options: {
    includeMinimalReset: true,
    reducedMotion: true,
  },
} satisfies Theme

export const limaLimaoPreset = {
  schemaVersion: 2,
  metadata: {
    name: 'Lima-limão',
    description:
      'Zesty lime-leaf greens with a squeeze of lemon on pale citrus mist.',
    version: '1.0.0',
  },
  tokens: {
    colors: {
      background: '#f2f6e5',
      surface: '#e6eed4',
      surfaceAlt: '#d8e3c0',
      text: '#22301a',
      textMuted: '#4f6139',
      primary: '#42751a',
      primaryHover: '#335c12',
      primaryText: '#f6faec',
      secondary: '#6f7a2e',
      border: '#c2cfa4',
      success: '#4d8a1f',
      warning: '#96702a',
      danger: '#b0472f',
      codeBackground: '#22301a',
      codeText: '#edf3da',
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
      radiusSm: '0.5rem',
      radiusMd: '1rem',
      radiusLg: '1.5rem',
      radiusFull: '999px',
    },
    shadow: {
      shadowSm: '0 1px 2px rgb(50 80 20 / 0.10)',
      shadowMd: '0 10px 28px rgb(50 80 20 / 0.12)',
      shadowLg: '0 24px 55px rgb(50 80 20 / 0.16)',
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
        background: '#131a0d',
        surface: '#1b2413',
        surfaceAlt: '#26311a',
        text: '#e9f1d8',
        textMuted: '#9dab86',
        primary: '#a4d65c',
        primaryHover: '#bde37e',
        primaryText: '#17220b',
        border: '#31401f',
        codeBackground: '#0c1107',
        codeText: '#edf3da',
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
        letterSpacing: '-0.025em',
      },
      h2: {
        fontSize: 'clamp(1.7rem, 5vw, 2.6rem)',
        letterSpacing: '-0.02em',
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
  options: {
    includeMinimalReset: true,
    reducedMotion: true,
  },
} satisfies Theme

export const morangoPreset = {
  schemaVersion: 2,
  metadata: {
    name: 'Morango',
    description:
      'Blush cream with ripe strawberry reds for a sweet, warm read.',
    version: '1.0.0',
  },
  tokens: {
    colors: {
      background: '#fdf3f1',
      surface: '#f9e4e0',
      surfaceAlt: '#f3d0ca',
      text: '#471b1e',
      textMuted: '#8a5a5e',
      primary: '#cf3249',
      primaryHover: '#ad2940',
      primaryText: '#fff5f3',
      secondary: '#a06a70',
      border: '#e6c2bb',
      success: '#5d8a4a',
      warning: '#a8791f',
      danger: '#cf3249',
      codeBackground: '#471b1e',
      codeText: '#ffe9e4',
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
      lineHeightBody: '1.7',
      lineHeightHeading: '1.15',
      fontWeightNormal: '400',
      fontWeightMedium: '600',
      fontWeightBold: '750',
    },
    radius: {
      radiusSm: '0.375rem',
      radiusMd: '0.9rem',
      radiusLg: '1.4rem',
      radiusFull: '999px',
    },
    shadow: {
      shadowSm: '0 1px 2px rgb(140 40 55 / 0.10)',
      shadowMd: '0 10px 28px rgb(140 40 55 / 0.12)',
      shadowLg: '0 24px 55px rgb(140 40 55 / 0.16)',
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
        background: '#1f1114',
        surface: '#2a161b',
        surfaceAlt: '#382027',
        text: '#f9e6e3',
        textMuted: '#c09a9e',
        primary: '#f06078',
        primaryHover: '#ff8296',
        primaryText: '#33090f',
        border: '#4c2633',
        codeBackground: '#120809',
        codeText: '#ffe4e1',
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
        letterSpacing: '-0.02em',
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
        fontStyle: 'italic',
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
  options: {
    includeMinimalReset: true,
    reducedMotion: true,
  },
} satisfies Theme

export const melanciaPreset = {
  schemaVersion: 2,
  metadata: {
    name: 'Melancia',
    description:
      'Watermelon flesh pinks with rind-green details on pale cream.',
    version: '1.0.0',
  },
  tokens: {
    colors: {
      background: '#f7f3ee',
      surface: '#f0e6e0',
      surfaceAlt: '#e6d2d2',
      text: '#37222b',
      textMuted: '#7c5c68',
      primary: '#c72f4f',
      primaryHover: '#a82540',
      primaryText: '#fff3f5',
      secondary: '#2e7d4f',
      border: '#dfc5c4',
      success: '#2e7d4f',
      warning: '#a8791f',
      danger: '#c72f4f',
      codeBackground: '#37222b',
      codeText: '#ffe9ee',
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
      radiusSm: '0.5rem',
      radiusMd: '1rem',
      radiusLg: '1.5rem',
      radiusFull: '999px',
    },
    shadow: {
      shadowSm: '0 1px 2px rgb(150 50 70 / 0.10)',
      shadowMd: '0 10px 28px rgb(150 50 70 / 0.12)',
      shadowLg: '0 24px 55px rgb(150 50 70 / 0.16)',
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
        background: '#1a1015',
        surface: '#25161d',
        surfaceAlt: '#311d27',
        text: '#f6e3e8',
        textMuted: '#bb95a2',
        primary: '#f4607e',
        primaryHover: '#ff85a0',
        primaryText: '#38060f',
        border: '#472331',
        codeBackground: '#0e070b',
        codeText: '#ffe0e8',
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
        letterSpacing: '-0.025em',
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
        borderInlineStart: '4px solid var(--color-secondary)',
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
  options: {
    includeMinimalReset: true,
    reducedMotion: true,
  },
} satisfies Theme

export const frutaDoCondePreset = {
  schemaVersion: 2,
  metadata: {
    name: 'Fruta-do-conde',
    description:
      'Custard cream with sugar-apple greens for a soft orchard read.',
    version: '1.0.0',
  },
  tokens: {
    colors: {
      background: '#f6f4e8',
      surface: '#ebe6d2',
      surfaceAlt: '#ded5ba',
      text: '#2e2b1d',
      textMuted: '#6b6350',
      primary: '#4e7523',
      primaryHover: '#3c5a1a',
      primaryText: '#f7f9ec',
      secondary: '#8a7a3a',
      border: '#d3cba9',
      success: '#4e7523',
      warning: '#9c7a1c',
      danger: '#a8442f',
      codeBackground: '#2e2b1d',
      codeText: '#f1ecd9',
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
      radiusSm: '0.375rem',
      radiusMd: '0.75rem',
      radiusLg: '1.25rem',
      radiusFull: '999px',
    },
    shadow: {
      shadowSm: '0 1px 2px rgb(90 90 40 / 0.10)',
      shadowMd: '0 10px 28px rgb(90 90 40 / 0.12)',
      shadowLg: '0 24px 55px rgb(90 90 40 / 0.16)',
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
        background: '#15130c',
        surface: '#1e1a10',
        surfaceAlt: '#2a2517',
        text: '#ece5cf',
        textMuted: '#a89f82',
        primary: '#a4c25e',
        primaryHover: '#bcd67e',
        primaryText: '#1a2008',
        border: '#38311c',
        codeBackground: '#0d0b06',
        codeText: '#f0e9d2',
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
        letterSpacing: '-0.02em',
      },
      h2: {
        fontSize: 'clamp(1.7rem, 5vw, 2.6rem)',
        letterSpacing: '-0.015em',
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
  options: {
    includeMinimalReset: true,
    reducedMotion: true,
  },
} satisfies Theme

export const mognoPreset = {
  schemaVersion: 2,
  metadata: {
    name: 'Mogno',
    description:
      'Polished mahogany browns with amber glow for a classic library feel.',
    version: '1.0.0',
  },
  tokens: {
    colors: {
      background: '#1c1210',
      surface: '#291917',
      surfaceAlt: '#35211d',
      text: '#f0e4d8',
      textMuted: '#b49a86',
      primary: '#d07a4a',
      primaryHover: '#e08f5c',
      primaryText: '#2c1006',
      secondary: '#9a7a63',
      border: '#453027',
      success: '#9ccb8f',
      warning: '#dfa04e',
      danger: '#e07a6a',
      codeBackground: '#100a08',
      codeText: '#f3e2d2',
    },
    typography: {
      fontBody: 'Inter, ui-sans-serif, system-ui, sans-serif',
      fontHeading: 'Georgia, "Times New Roman", serif',
      fontMono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      fontSizeBase: '16px',
      fontSizeXs: '0.75rem',
      fontSizeSm: '0.875rem',
      fontSizeMd: '1rem',
      fontSizeLg: '1.25rem',
      fontSizeXl: '2.25rem',
      lineHeightBody: '1.7',
      lineHeightHeading: '1.12',
      fontWeightNormal: '400',
      fontWeightMedium: '600',
      fontWeightBold: '750',
    },
    radius: {
      radiusSm: '0.25rem',
      radiusMd: '0.5rem',
      radiusLg: '0.75rem',
      radiusFull: '999px',
    },
    shadow: {
      shadowSm: '0 1px 2px rgb(0 0 0 / 0.4)',
      shadowMd: '0 12px 30px rgb(0 0 0 / 0.42)',
      shadowLg: '0 24px 55px rgb(0 0 0 / 0.48)',
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
        background: '#150d0b',
        surface: '#201310',
        surfaceAlt: '#2b1a16',
        text: '#f0e4d8',
        textMuted: '#b49a86',
        primary: '#d07a4a',
        primaryHover: '#e08f5c',
        primaryText: '#2c1006',
        border: '#3a271f',
        codeBackground: '#0c0705',
        codeText: '#f3e2d2',
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
        fontSize: 'clamp(2.3rem, 6vw, 4.2rem)',
        fontFamily: 'Georgia, "Times New Roman", serif',
        letterSpacing: '-0.01em',
      },
      h2: {
        fontSize: 'clamp(1.7rem, 5vw, 2.6rem)',
        fontFamily: 'Georgia, "Times New Roman", serif',
        letterSpacing: '-0.01em',
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
        color: 'var(--color-text)',
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontStyle: 'italic',
        fontSize: '1.15em',
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
  options: {
    includeMinimalReset: true,
    reducedMotion: true,
  },
} satisfies Theme

export const carvalhoPreset = {
  schemaVersion: 2,
  metadata: {
    name: 'Carvalho',
    description:
      'Sturdy honey-oak tones with bronze accents for a warm, grounded read.',
    version: '1.0.0',
  },
  tokens: {
    colors: {
      background: '#f7f2e8',
      surface: '#efe4d0',
      surfaceAlt: '#e4d3b4',
      text: '#3a2c1c',
      textMuted: '#75603f',
      primary: '#9a6420',
      primaryHover: '#7d5018',
      primaryText: '#fdf6e7',
      secondary: '#7a6a45',
      border: '#d9c6a1',
      success: '#6d8a3f',
      warning: '#9a6420',
      danger: '#b0472f',
      codeBackground: '#3a2c1c',
      codeText: '#f5e8d2',
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
      radiusMd: '0.5rem',
      radiusLg: '0.875rem',
      radiusFull: '999px',
    },
    shadow: {
      shadowSm: '0 1px 2px rgb(100 70 25 / 0.12)',
      shadowMd: '0 10px 26px rgb(100 70 25 / 0.14)',
      shadowLg: '0 22px 50px rgb(100 70 25 / 0.18)',
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
        background: '#1a140d',
        surface: '#241b10',
        surfaceAlt: '#302515',
        text: '#eee2cb',
        textMuted: '#b39f78',
        primary: '#d29a4a',
        primaryHover: '#e2ad60',
        primaryText: '#2a1a05',
        border: '#3d2f1a',
        codeBackground: '#100b06',
        codeText: '#f2e4c8',
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
        letterSpacing: '-0.02em',
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
        borderInlineStart: '5px solid var(--color-primary)',
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
  options: {
    includeMinimalReset: true,
    reducedMotion: true,
  },
} satisfies Theme

export const jacarandaPreset = {
  schemaVersion: 2,
  metadata: {
    name: 'Jacarandá',
    description:
      'Deep rosewood espresso with dusty-rose highlights for quiet drama.',
    version: '1.0.0',
  },
  tokens: {
    colors: {
      background: '#161216',
      surface: '#211a21',
      surfaceAlt: '#2c232c',
      text: '#ece2e8',
      textMuted: '#ab9aa8',
      primary: '#c083b0',
      primaryHover: '#d29ac2',
      primaryText: '#2b0f24',
      secondary: '#8a7586',
      border: '#3d2f3d',
      success: '#93bd8b',
      warning: '#d9a441',
      danger: '#e08073',
      codeBackground: '#0e0a0e',
      codeText: '#f2e2ec',
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
      lineHeightBody: '1.7',
      lineHeightHeading: '1.1',
      fontWeightNormal: '400',
      fontWeightMedium: '600',
      fontWeightBold: '750',
    },
    radius: {
      radiusSm: '0.375rem',
      radiusMd: '0.625rem',
      radiusLg: '1rem',
      radiusFull: '999px',
    },
    shadow: {
      shadowSm: '0 1px 2px rgb(0 0 0 / 0.4)',
      shadowMd: '0 12px 30px rgb(40 10 35 / 0.45)',
      shadowLg: '0 24px 55px rgb(40 10 35 / 0.5)',
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
        background: '#110d11',
        surface: '#1a141a',
        surfaceAlt: '#251d25',
        text: '#ece2e8',
        textMuted: '#ab9aa8',
        primary: '#c083b0',
        primaryHover: '#d29ac2',
        primaryText: '#2b0f24',
        border: '#342834',
        codeBackground: '#0b070b',
        codeText: '#f2e2ec',
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
        fontSize: 'clamp(2.4rem, 7vw, 4.4rem)',
        letterSpacing: '-0.025em',
      },
      h2: {
        fontSize: 'clamp(1.7rem, 5vw, 2.6rem)',
        letterSpacing: '-0.02em',
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
        color: 'var(--color-text)',
        fontStyle: 'italic',
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
  options: {
    includeMinimalReset: true,
    reducedMotion: true,
  },
} satisfies Theme

export const oceanoPreset = {
  "schemaVersion": 2,
  "metadata": {
    "name": "Oceano",
    "description": "Cool aqua mist with deep-sea navy text and ocean-blue accents.",
    "version": "1.0.0"
  },
  "tokens": {
    "colors": {
      "background": "#eef6f8",
      "surface": "#ffffff",
      "surfaceAlt": "#dcebf1",
      "text": "#0f2a36",
      "textMuted": "#46626f",
      "primary": "#0b6e99",
      "primaryHover": "#095a7d",
      "primaryText": "#ffffff",
      "secondary": "#2a9db8",
      "border": "#c3d9e2",
      "success": "#1e7d4f",
      "warning": "#9a6100",
      "danger": "#b42318",
      "codeBackground": "#0f2a36",
      "codeText": "#dff1f7"
    },
    "typography": {
      "fontBody": "Inter, ui-sans-serif, system-ui, sans-serif",
      "fontHeading": "Inter, ui-sans-serif, system-ui, sans-serif",
      "fontMono": "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
      "fontSizeBase": "16px",
      "fontSizeXs": "0.75rem",
      "fontSizeSm": "0.875rem",
      "fontSizeMd": "1rem",
      "fontSizeLg": "1.25rem",
      "fontSizeXl": "2.25rem",
      "lineHeightBody": "1.65",
      "lineHeightHeading": "1.15",
      "fontWeightNormal": "400",
      "fontWeightMedium": "600",
      "fontWeightBold": "750"
    },
    "radius": {
      "radiusSm": "0.375rem",
      "radiusMd": "0.75rem",
      "radiusLg": "1.25rem",
      "radiusFull": "999px"
    },
    "shadow": {
      "shadowSm": "0 1px 2px rgb(11 110 153 / 0.12)",
      "shadowMd": "0 10px 28px rgb(11 110 153 / 0.14)",
      "shadowLg": "0 24px 55px rgb(11 110 153 / 0.18)"
    },
    "spacing": {
      "spaceXs": "0.25rem",
      "spaceSm": "0.5rem",
      "spaceMd": "1rem",
      "spaceLg": "1.5rem",
      "spaceXl": "2.25rem",
      "space2xl": "4rem",
      "space2xlXs": "2.5rem"
    },
    "layout": {
      "contentWidth": "72ch",
      "wideWidth": "1120px",
      "bodyPadding": "1.25rem",
      "sectionSpacing": "3rem",
      "headerWidth": "1120px",
      "footerWidth": "1120px",
      "bodyPaddingSm": "1rem",
      "bodyPaddingXs": "0.8rem",
      "sectionSpacingSm": "2rem"
    },
    "scroll": {
      "scrollbarWidth": "auto",
      "scrollbarSize": "12px",
      "scrollbarTrack": "var(--color-surface)",
      "scrollbarThumb": "var(--color-border)",
      "scrollbarThumbHover": "var(--color-text-muted)",
      "scrollbarRadius": "var(--radius-full)",
      "scrollbarGutter": "auto",
      "scrollBehavior": "auto",
      "scrollPaddingTop": "0",
      "overscrollBehavior": "auto"
    }
  },
  "modes": {
    "light": {
      "colors": {}
    },
    "dark": {
      "colors": {
        "background": "#081b24",
        "surface": "#0e2530",
        "surfaceAlt": "#153140",
        "text": "#d9ecf3",
        "textMuted": "#93b8c7",
        "primary": "#5ec8e8",
        "primaryHover": "#86d6ef",
        "primaryText": "#06121f",
        "border": "#234353",
        "codeBackground": "#040f14",
        "codeText": "#d9ecf3"
      }
    }
  },
  "layers": {
    "base": {
      "html": {
        "colorScheme": "light dark",
        "background": "var(--color-background)"
      },
      "h1, h2, h3, h4, h5, h6": {
        "fontFamily": "var(--font-heading)",
        "fontWeight": "var(--font-weight-bold)",
        "lineHeight": "var(--line-height-heading)",
        "marginBlock": "1.25em 0.5em"
      },
      "p, ul, ol, dl, blockquote, pre, figure, table, form, details": {
        "marginBlock": "0 var(--space-lg)"
      },
      "th, td": {
        "padding": "var(--space-sm) var(--space-md)",
        "verticalAlign": "top"
      },
      "label": {
        "display": "block",
        "marginBlock": "var(--space-sm)"
      },
      "input:not([type=\"checkbox\"]):not([type=\"radio\"]), textarea, select": {
        "width": "100%"
      },
      "input, textarea, select, button": {
        "background": "var(--color-surface)",
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-sm)",
        "color": "var(--color-text)",
        "font": "inherit",
        "padding": "0.65rem 0.8rem"
      },
      "button": {
        "background": "var(--color-primary)",
        "color": "var(--color-primary-text)"
      }
    },
    "elements": {
      "pre code": {
        "background": "transparent",
        "color": "inherit",
        "padding": "0"
      },
      "body": {
        "margin": "0",
        "backgroundColor": "var(--color-background)",
        "color": "var(--color-text)",
        "fontFamily": "var(--font-body)",
        "fontSize": "var(--font-size-base)",
        "lineHeight": "var(--line-height-body)"
      },
      "header": {
        "maxWidth": "var(--header-width)",
        "marginInline": "auto",
        "padding": "var(--space-lg) var(--body-padding)"
      },
      "nav": {
        "display": "flex",
        "gap": "var(--space-md)",
        "alignItems": "center",
        "flexWrap": "wrap"
      },
      "main": {
        "maxWidth": "var(--content-width)",
        "marginInline": "auto",
        "padding": "var(--space-lg) var(--body-padding) var(--space-2xl)"
      },
      "section": {
        "marginBlock": "var(--section-spacing)"
      },
      "article": {
        "backgroundColor": "var(--color-surface)",
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-md)",
        "padding": "var(--space-lg)",
        "boxShadow": "var(--shadow-sm)"
      },
      "aside": {
        "borderInlineStart": "4px solid var(--color-primary)",
        "backgroundColor": "var(--color-surface)",
        "padding": "var(--space-md)"
      },
      "footer": {
        "maxWidth": "var(--footer-width)",
        "marginInline": "auto",
        "padding": "var(--space-xl) var(--body-padding)",
        "color": "var(--color-text-muted)",
        "borderTop": "1px solid var(--color-border)"
      },
      "h1": {
        "fontSize": "clamp(2.2rem, 7vw, 4.25rem)",
        "letterSpacing": "-0.025em"
      },
      "h2": {
        "fontSize": "clamp(1.7rem, 5vw, 2.6rem)",
        "letterSpacing": "-0.02em"
      },
      "h3": {
        "fontSize": "1.5rem"
      },
      "h4": {
        "fontSize": "1.25rem"
      },
      "h5": {
        "fontSize": "1.05rem"
      },
      "h6": {
        "fontSize": "0.95rem",
        "textTransform": "uppercase",
        "letterSpacing": "0.08em"
      },
      "a": {
        "color": "var(--color-primary)",
        "textUnderlineOffset": "0.2em"
      },
      "mark": {
        "backgroundColor": "color-mix(in srgb, var(--color-warning) 25%, transparent)",
        "color": "inherit"
      },
      "blockquote": {
        "marginInline": "0",
        "padding": "var(--space-md) var(--space-lg)",
        "borderInlineStart": "4px solid var(--color-secondary)",
        "color": "var(--color-text-muted)"
      },
      "hr": {
        "border": "0",
        "borderTop": "1px solid var(--color-border)",
        "marginBlock": "var(--space-xl)"
      },
      "code": {
        "fontFamily": "var(--font-mono)",
        "backgroundColor": "var(--color-surface-alt)",
        "borderRadius": "var(--radius-sm)",
        "padding": "0.1em 0.35em"
      },
      "pre": {
        "backgroundColor": "var(--color-code-background)",
        "color": "var(--color-code-text)",
        "padding": "var(--space-lg)",
        "borderRadius": "var(--radius-md)",
        "overflowX": "auto"
      },
      "kbd": {
        "fontFamily": "var(--font-mono)",
        "border": "1px solid var(--color-border)",
        "borderBottomWidth": "3px",
        "borderRadius": "var(--radius-sm)",
        "padding": "0.12rem 0.4rem",
        "backgroundColor": "var(--color-surface)"
      },
      "table": {
        "width": "100%",
        "borderCollapse": "collapse",
        "marginBlock": "var(--space-lg)"
      },
      "th": {
        "textAlign": "left",
        "backgroundColor": "var(--color-surface)"
      },
      "td": {
        "borderTop": "1px solid var(--color-border)"
      },
      "caption": {
        "color": "var(--color-text-muted)",
        "marginBottom": "var(--space-sm)",
        "textAlign": "left"
      },
      "fieldset": {
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-md)",
        "padding": "var(--space-lg)"
      },
      "input": {
        "boxSizing": "border-box"
      },
      "textarea": {
        "width": "100%",
        "boxSizing": "border-box",
        "minHeight": "7rem",
        "resize": "vertical"
      },
      "select": {
        "width": "100%",
        "boxSizing": "border-box"
      },
      "button": {
        "cursor": "pointer",
        "fontWeight": "var(--font-weight-medium)"
      },
      "img": {
        "maxWidth": "100%",
        "height": "auto",
        "borderRadius": "var(--radius-md)"
      },
      "figure": {
        "marginInline": "0"
      },
      "figcaption": {
        "color": "var(--color-text-muted)",
        "fontSize": "var(--font-size-sm)"
      },
      "details": {
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-md)",
        "padding": "var(--space-md)"
      },
      "summary": {
        "cursor": "pointer",
        "fontWeight": "var(--font-weight-medium)"
      }
    },
    "states": {
      "a:hover": {
        "color": "var(--color-primary-hover)"
      },
      "a:focus-visible": {
        "outline": "3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)",
        "outlineOffset": "3px"
      },
      "button:hover": {
        "backgroundColor": "var(--color-primary-hover)"
      },
      "button:focus-visible": {
        "outline": "3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)",
        "outlineOffset": "3px"
      },
      "button:active": {
        "transform": "translateY(1px)"
      },
      "button:disabled": {
        "opacity": "0.55",
        "cursor": "not-allowed"
      },
      "input:focus-visible": {
        "outline": "3px solid color-mix(in srgb, var(--color-primary) 35%, transparent)",
        "borderColor": "var(--color-primary)"
      },
      "input:disabled": {
        "opacity": "0.6",
        "cursor": "not-allowed"
      },
      "input:checked": {
        "accentColor": "var(--color-primary)"
      }
    },
    "responsive": {
      "tablet": {
        ":root": {
          "--body-padding": "var(--body-padding-sm)",
          "--section-spacing": "var(--section-spacing-sm)"
        },
        "table": {
          "fontSize": "var(--font-size-sm)"
        }
      },
      "mobile": {
        ":root": {
          "--body-padding": "var(--body-padding-xs)",
          "--space-2xl": "var(--space-2xl-xs)"
        },
        "h1": {
          "overflowWrap": "anywhere"
        }
      }
    }
  },
  "breakpoints": {
    "mobile": 390,
    "tablet": 768,
    "desktop": 1440
  },
  "options": {
    "includeMinimalReset": true,
    "reducedMotion": true
  }
} satisfies Theme

export const florestaPreset = {
  "schemaVersion": 2,
  "metadata": {
    "name": "Floresta",
    "description": "Rich emerald greens with serif headlines for a deep-woods read.",
    "version": "1.0.0"
  },
  "tokens": {
    "colors": {
      "background": "#eef3e8",
      "surface": "#e4ebda",
      "surfaceAlt": "#d3ddc4",
      "text": "#1e2d1f",
      "textMuted": "#4d6350",
      "primary": "#2f6b2e",
      "primaryHover": "#245423",
      "primaryText": "#f5f9f0",
      "secondary": "#6a8a3f",
      "border": "#c2cfb2",
      "success": "#2f6b2e",
      "warning": "#8a6d1c",
      "danger": "#a8442f",
      "codeBackground": "#1e2d1f",
      "codeText": "#e4efe0"
    },
    "typography": {
      "fontBody": "Inter, ui-sans-serif, system-ui, sans-serif",
      "fontHeading": "Georgia, \"Times New Roman\", serif",
      "fontMono": "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
      "fontSizeBase": "16px",
      "fontSizeXs": "0.75rem",
      "fontSizeSm": "0.875rem",
      "fontSizeMd": "1rem",
      "fontSizeLg": "1.25rem",
      "fontSizeXl": "2.25rem",
      "lineHeightBody": "1.7",
      "lineHeightHeading": "1.15",
      "fontWeightNormal": "400",
      "fontWeightMedium": "600",
      "fontWeightBold": "750"
    },
    "radius": {
      "radiusSm": "0.375rem",
      "radiusMd": "0.75rem",
      "radiusLg": "1.5rem",
      "radiusFull": "999px"
    },
    "shadow": {
      "shadowSm": "0 1px 2px rgb(35 80 40 / 0.12)",
      "shadowMd": "0 10px 28px rgb(35 80 40 / 0.14)",
      "shadowLg": "0 24px 55px rgb(35 80 40 / 0.18)"
    },
    "spacing": {
      "spaceXs": "0.25rem",
      "spaceSm": "0.5rem",
      "spaceMd": "1rem",
      "spaceLg": "1.5rem",
      "spaceXl": "2.25rem",
      "space2xl": "4rem",
      "space2xlXs": "2.5rem"
    },
    "layout": {
      "contentWidth": "72ch",
      "wideWidth": "1120px",
      "bodyPadding": "1.25rem",
      "sectionSpacing": "3rem",
      "headerWidth": "1120px",
      "footerWidth": "1120px",
      "bodyPaddingSm": "1rem",
      "bodyPaddingXs": "0.8rem",
      "sectionSpacingSm": "2rem"
    },
    "scroll": {
      "scrollbarWidth": "auto",
      "scrollbarSize": "12px",
      "scrollbarTrack": "var(--color-surface)",
      "scrollbarThumb": "var(--color-border)",
      "scrollbarThumbHover": "var(--color-text-muted)",
      "scrollbarRadius": "var(--radius-full)",
      "scrollbarGutter": "auto",
      "scrollBehavior": "auto",
      "scrollPaddingTop": "0",
      "overscrollBehavior": "auto"
    }
  },
  "modes": {
    "light": {
      "colors": {}
    },
    "dark": {
      "colors": {
        "background": "#0f1710",
        "surface": "#182117",
        "surfaceAlt": "#222f20",
        "text": "#e2eddf",
        "textMuted": "#9db3a0",
        "primary": "#8fce8a",
        "primaryHover": "#a9dba9",
        "primaryText": "#0d1a0e",
        "border": "#2c3a2a",
        "codeBackground": "#090e09",
        "codeText": "#e2eddf"
      }
    }
  },
  "layers": {
    "base": {
      "html": {
        "colorScheme": "light dark",
        "background": "var(--color-background)"
      },
      "h1, h2, h3, h4, h5, h6": {
        "fontFamily": "var(--font-heading)",
        "fontWeight": "var(--font-weight-bold)",
        "lineHeight": "var(--line-height-heading)",
        "marginBlock": "1.25em 0.5em"
      },
      "p, ul, ol, dl, blockquote, pre, figure, table, form, details": {
        "marginBlock": "0 var(--space-lg)"
      },
      "th, td": {
        "padding": "var(--space-sm) var(--space-md)",
        "verticalAlign": "top"
      },
      "label": {
        "display": "block",
        "marginBlock": "var(--space-sm)"
      },
      "input:not([type=\"checkbox\"]):not([type=\"radio\"]), textarea, select": {
        "width": "100%"
      },
      "input, textarea, select, button": {
        "background": "var(--color-surface)",
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-sm)",
        "color": "var(--color-text)",
        "font": "inherit",
        "padding": "0.65rem 0.8rem"
      },
      "button": {
        "background": "var(--color-primary)",
        "color": "var(--color-primary-text)"
      }
    },
    "elements": {
      "pre code": {
        "background": "transparent",
        "color": "inherit",
        "padding": "0"
      },
      "body": {
        "margin": "0",
        "backgroundColor": "var(--color-background)",
        "color": "var(--color-text)",
        "fontFamily": "var(--font-body)",
        "fontSize": "var(--font-size-base)",
        "lineHeight": "var(--line-height-body)"
      },
      "header": {
        "maxWidth": "var(--header-width)",
        "marginInline": "auto",
        "padding": "var(--space-lg) var(--body-padding)"
      },
      "nav": {
        "display": "flex",
        "gap": "var(--space-md)",
        "alignItems": "center",
        "flexWrap": "wrap"
      },
      "main": {
        "maxWidth": "var(--content-width)",
        "marginInline": "auto",
        "padding": "var(--space-lg) var(--body-padding) var(--space-2xl)"
      },
      "section": {
        "marginBlock": "var(--section-spacing)"
      },
      "article": {
        "backgroundColor": "var(--color-surface)",
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-md)",
        "padding": "var(--space-lg)",
        "boxShadow": "var(--shadow-sm)"
      },
      "aside": {
        "borderInlineStart": "4px solid var(--color-primary)",
        "backgroundColor": "var(--color-surface)",
        "padding": "var(--space-md)"
      },
      "footer": {
        "maxWidth": "var(--footer-width)",
        "marginInline": "auto",
        "padding": "var(--space-xl) var(--body-padding)",
        "color": "var(--color-text-muted)",
        "borderTop": "1px solid var(--color-border)"
      },
      "h1": {
        "fontSize": "clamp(2.2rem, 7vw, 4.25rem)",
        "fontFamily": "Georgia, \"Times New Roman\", serif",
        "letterSpacing": "-0.02em"
      },
      "h2": {
        "fontSize": "clamp(1.7rem, 5vw, 2.6rem)",
        "fontFamily": "Georgia, \"Times New Roman\", serif",
        "letterSpacing": "-0.015em"
      },
      "h3": {
        "fontSize": "1.5rem"
      },
      "h4": {
        "fontSize": "1.25rem"
      },
      "h5": {
        "fontSize": "1.05rem"
      },
      "h6": {
        "fontSize": "0.95rem",
        "textTransform": "uppercase",
        "letterSpacing": "0.08em"
      },
      "a": {
        "color": "var(--color-primary)",
        "textUnderlineOffset": "0.2em"
      },
      "mark": {
        "backgroundColor": "color-mix(in srgb, var(--color-warning) 25%, transparent)",
        "color": "inherit"
      },
      "blockquote": {
        "marginInline": "0",
        "padding": "var(--space-md) var(--space-lg)",
        "borderInlineStart": "4px solid var(--color-primary)",
        "color": "var(--color-text-muted)",
        "fontStyle": "italic",
        "fontSize": "1.12em"
      },
      "hr": {
        "border": "0",
        "borderTop": "1px solid var(--color-border)",
        "marginBlock": "var(--space-xl)"
      },
      "code": {
        "fontFamily": "var(--font-mono)",
        "backgroundColor": "var(--color-surface-alt)",
        "borderRadius": "var(--radius-sm)",
        "padding": "0.1em 0.35em"
      },
      "pre": {
        "backgroundColor": "var(--color-code-background)",
        "color": "var(--color-code-text)",
        "padding": "var(--space-lg)",
        "borderRadius": "var(--radius-md)",
        "overflowX": "auto"
      },
      "kbd": {
        "fontFamily": "var(--font-mono)",
        "border": "1px solid var(--color-border)",
        "borderBottomWidth": "3px",
        "borderRadius": "var(--radius-sm)",
        "padding": "0.12rem 0.4rem",
        "backgroundColor": "var(--color-surface)"
      },
      "table": {
        "width": "100%",
        "borderCollapse": "collapse",
        "marginBlock": "var(--space-lg)"
      },
      "th": {
        "textAlign": "left",
        "backgroundColor": "var(--color-surface)"
      },
      "td": {
        "borderTop": "1px solid var(--color-border)"
      },
      "caption": {
        "color": "var(--color-text-muted)",
        "marginBottom": "var(--space-sm)",
        "textAlign": "left"
      },
      "fieldset": {
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-md)",
        "padding": "var(--space-lg)"
      },
      "input": {
        "boxSizing": "border-box"
      },
      "textarea": {
        "width": "100%",
        "boxSizing": "border-box",
        "minHeight": "7rem",
        "resize": "vertical"
      },
      "select": {
        "width": "100%",
        "boxSizing": "border-box"
      },
      "button": {
        "cursor": "pointer",
        "fontWeight": "var(--font-weight-medium)"
      },
      "img": {
        "maxWidth": "100%",
        "height": "auto",
        "borderRadius": "var(--radius-md)"
      },
      "figure": {
        "marginInline": "0"
      },
      "figcaption": {
        "color": "var(--color-text-muted)",
        "fontSize": "var(--font-size-sm)"
      },
      "details": {
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-md)",
        "padding": "var(--space-md)"
      },
      "summary": {
        "cursor": "pointer",
        "fontWeight": "var(--font-weight-medium)"
      }
    },
    "states": {
      "a:hover": {
        "color": "var(--color-primary-hover)"
      },
      "a:focus-visible": {
        "outline": "3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)",
        "outlineOffset": "3px"
      },
      "button:hover": {
        "backgroundColor": "var(--color-primary-hover)"
      },
      "button:focus-visible": {
        "outline": "3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)",
        "outlineOffset": "3px"
      },
      "button:active": {
        "transform": "translateY(1px)"
      },
      "button:disabled": {
        "opacity": "0.55",
        "cursor": "not-allowed"
      },
      "input:focus-visible": {
        "outline": "3px solid color-mix(in srgb, var(--color-primary) 35%, transparent)",
        "borderColor": "var(--color-primary)"
      },
      "input:disabled": {
        "opacity": "0.6",
        "cursor": "not-allowed"
      },
      "input:checked": {
        "accentColor": "var(--color-primary)"
      }
    },
    "responsive": {
      "tablet": {
        ":root": {
          "--body-padding": "var(--body-padding-sm)",
          "--section-spacing": "var(--section-spacing-sm)"
        },
        "table": {
          "fontSize": "var(--font-size-sm)"
        }
      },
      "mobile": {
        ":root": {
          "--body-padding": "var(--body-padding-xs)",
          "--space-2xl": "var(--space-2xl-xs)"
        },
        "h1": {
          "overflowWrap": "anywhere"
        }
      }
    }
  },
  "breakpoints": {
    "mobile": 390,
    "tablet": 768,
    "desktop": 1440
  },
  "options": {
    "includeMinimalReset": true,
    "reducedMotion": true
  }
} satisfies Theme

export const porDoSolPreset = {
  "schemaVersion": 2,
  "metadata": {
    "name": "Pôr-do-sol",
    "description": "Warm cream with burnt-orange glow for a golden-hour read.",
    "version": "1.0.0"
  },
  "tokens": {
    "colors": {
      "background": "#fff5ea",
      "surface": "#ffeddb",
      "surfaceAlt": "#f9ddc0",
      "text": "#3d2314",
      "textMuted": "#6e4a38",
      "primary": "#c2410c",
      "primaryHover": "#9e3409",
      "primaryText": "#ffffff",
      "secondary": "#d97706",
      "border": "#e8cfae",
      "success": "#5d8a3f",
      "warning": "#b45309",
      "danger": "#b42318",
      "codeBackground": "#3d2314",
      "codeText": "#ffe8d4"
    },
    "typography": {
      "fontBody": "Inter, ui-sans-serif, system-ui, sans-serif",
      "fontHeading": "Inter, ui-sans-serif, system-ui, sans-serif",
      "fontMono": "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
      "fontSizeBase": "16px",
      "fontSizeXs": "0.75rem",
      "fontSizeSm": "0.875rem",
      "fontSizeMd": "1rem",
      "fontSizeLg": "1.25rem",
      "fontSizeXl": "2.25rem",
      "lineHeightBody": "1.65",
      "lineHeightHeading": "1.1",
      "fontWeightNormal": "400",
      "fontWeightMedium": "600",
      "fontWeightBold": "750"
    },
    "radius": {
      "radiusSm": "0.5rem",
      "radiusMd": "1rem",
      "radiusLg": "1.5rem",
      "radiusFull": "999px"
    },
    "shadow": {
      "shadowSm": "0 1px 2px rgb(180 90 20 / 0.12)",
      "shadowMd": "0 10px 28px rgb(180 90 20 / 0.15)",
      "shadowLg": "0 24px 55px rgb(180 90 20 / 0.20)"
    },
    "spacing": {
      "spaceXs": "0.25rem",
      "spaceSm": "0.5rem",
      "spaceMd": "1rem",
      "spaceLg": "1.5rem",
      "spaceXl": "2.25rem",
      "space2xl": "4rem",
      "space2xlXs": "2.5rem"
    },
    "layout": {
      "contentWidth": "72ch",
      "wideWidth": "1120px",
      "bodyPadding": "1.25rem",
      "sectionSpacing": "3rem",
      "headerWidth": "1120px",
      "footerWidth": "1120px",
      "bodyPaddingSm": "1rem",
      "bodyPaddingXs": "0.8rem",
      "sectionSpacingSm": "2rem"
    },
    "scroll": {
      "scrollbarWidth": "auto",
      "scrollbarSize": "12px",
      "scrollbarTrack": "var(--color-surface)",
      "scrollbarThumb": "var(--color-border)",
      "scrollbarThumbHover": "var(--color-text-muted)",
      "scrollbarRadius": "var(--radius-full)",
      "scrollbarGutter": "auto",
      "scrollBehavior": "auto",
      "scrollPaddingTop": "0",
      "overscrollBehavior": "auto"
    }
  },
  "modes": {
    "light": {
      "colors": {}
    },
    "dark": {
      "colors": {
        "background": "#1f1008",
        "surface": "#2b170c",
        "surfaceAlt": "#3a2010",
        "text": "#f7e3d3",
        "textMuted": "#c49a80",
        "primary": "#ff9a5c",
        "primaryHover": "#ffb183",
        "primaryText": "#241005",
        "border": "#4a2b18",
        "codeBackground": "#100805",
        "codeText": "#f7e3d3"
      }
    }
  },
  "layers": {
    "base": {
      "html": {
        "colorScheme": "light dark",
        "background": "var(--color-background)"
      },
      "h1, h2, h3, h4, h5, h6": {
        "fontFamily": "var(--font-heading)",
        "fontWeight": "var(--font-weight-bold)",
        "lineHeight": "var(--line-height-heading)",
        "marginBlock": "1.25em 0.5em"
      },
      "p, ul, ol, dl, blockquote, pre, figure, table, form, details": {
        "marginBlock": "0 var(--space-lg)"
      },
      "th, td": {
        "padding": "var(--space-sm) var(--space-md)",
        "verticalAlign": "top"
      },
      "label": {
        "display": "block",
        "marginBlock": "var(--space-sm)"
      },
      "input:not([type=\"checkbox\"]):not([type=\"radio\"]), textarea, select": {
        "width": "100%"
      },
      "input, textarea, select, button": {
        "background": "var(--color-surface)",
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-sm)",
        "color": "var(--color-text)",
        "font": "inherit",
        "padding": "0.65rem 0.8rem"
      },
      "button": {
        "background": "var(--color-primary)",
        "color": "var(--color-primary-text)"
      }
    },
    "elements": {
      "pre code": {
        "background": "transparent",
        "color": "inherit",
        "padding": "0"
      },
      "body": {
        "margin": "0",
        "backgroundColor": "var(--color-background)",
        "color": "var(--color-text)",
        "fontFamily": "var(--font-body)",
        "fontSize": "var(--font-size-base)",
        "lineHeight": "var(--line-height-body)"
      },
      "header": {
        "maxWidth": "var(--header-width)",
        "marginInline": "auto",
        "padding": "var(--space-lg) var(--body-padding)"
      },
      "nav": {
        "display": "flex",
        "gap": "var(--space-md)",
        "alignItems": "center",
        "flexWrap": "wrap"
      },
      "main": {
        "maxWidth": "var(--content-width)",
        "marginInline": "auto",
        "padding": "var(--space-lg) var(--body-padding) var(--space-2xl)"
      },
      "section": {
        "marginBlock": "var(--section-spacing)"
      },
      "article": {
        "backgroundColor": "var(--color-surface)",
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-md)",
        "padding": "var(--space-lg)",
        "boxShadow": "var(--shadow-sm)"
      },
      "aside": {
        "borderInlineStart": "4px solid var(--color-primary)",
        "backgroundColor": "var(--color-surface)",
        "padding": "var(--space-md)"
      },
      "footer": {
        "maxWidth": "var(--footer-width)",
        "marginInline": "auto",
        "padding": "var(--space-xl) var(--body-padding)",
        "color": "var(--color-text-muted)",
        "borderTop": "1px solid var(--color-border)"
      },
      "h1": {
        "fontSize": "clamp(2.4rem, 7vw, 4.5rem)",
        "letterSpacing": "-0.02em"
      },
      "h2": {
        "fontSize": "clamp(1.7rem, 5vw, 2.6rem)",
        "letterSpacing": "-0.015em"
      },
      "h3": {
        "fontSize": "1.5rem"
      },
      "h4": {
        "fontSize": "1.25rem"
      },
      "h5": {
        "fontSize": "1.05rem"
      },
      "h6": {
        "fontSize": "0.95rem",
        "textTransform": "uppercase",
        "letterSpacing": "0.08em"
      },
      "a": {
        "color": "var(--color-primary)",
        "textUnderlineOffset": "0.2em"
      },
      "mark": {
        "backgroundColor": "color-mix(in srgb, var(--color-warning) 25%, transparent)",
        "color": "inherit"
      },
      "blockquote": {
        "marginInline": "0",
        "padding": "var(--space-md) var(--space-lg)",
        "borderInlineStart": "4px solid var(--color-primary)",
        "color": "var(--color-text-muted)",
        "fontStyle": "italic"
      },
      "hr": {
        "border": "0",
        "borderTop": "1px solid var(--color-border)",
        "marginBlock": "var(--space-xl)"
      },
      "code": {
        "fontFamily": "var(--font-mono)",
        "backgroundColor": "var(--color-surface-alt)",
        "borderRadius": "var(--radius-sm)",
        "padding": "0.1em 0.35em"
      },
      "pre": {
        "backgroundColor": "var(--color-code-background)",
        "color": "var(--color-code-text)",
        "padding": "var(--space-lg)",
        "borderRadius": "var(--radius-md)",
        "overflowX": "auto"
      },
      "kbd": {
        "fontFamily": "var(--font-mono)",
        "border": "1px solid var(--color-border)",
        "borderBottomWidth": "3px",
        "borderRadius": "var(--radius-sm)",
        "padding": "0.12rem 0.4rem",
        "backgroundColor": "var(--color-surface)"
      },
      "table": {
        "width": "100%",
        "borderCollapse": "collapse",
        "marginBlock": "var(--space-lg)"
      },
      "th": {
        "textAlign": "left",
        "backgroundColor": "var(--color-surface)"
      },
      "td": {
        "borderTop": "1px solid var(--color-border)"
      },
      "caption": {
        "color": "var(--color-text-muted)",
        "marginBottom": "var(--space-sm)",
        "textAlign": "left"
      },
      "fieldset": {
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-md)",
        "padding": "var(--space-lg)"
      },
      "input": {
        "boxSizing": "border-box"
      },
      "textarea": {
        "width": "100%",
        "boxSizing": "border-box",
        "minHeight": "7rem",
        "resize": "vertical"
      },
      "select": {
        "width": "100%",
        "boxSizing": "border-box"
      },
      "button": {
        "cursor": "pointer",
        "fontWeight": "var(--font-weight-medium)"
      },
      "img": {
        "maxWidth": "100%",
        "height": "auto",
        "borderRadius": "var(--radius-md)"
      },
      "figure": {
        "marginInline": "0"
      },
      "figcaption": {
        "color": "var(--color-text-muted)",
        "fontSize": "var(--font-size-sm)"
      },
      "details": {
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-md)",
        "padding": "var(--space-md)"
      },
      "summary": {
        "cursor": "pointer",
        "fontWeight": "var(--font-weight-medium)"
      }
    },
    "states": {
      "a:hover": {
        "color": "var(--color-primary-hover)"
      },
      "a:focus-visible": {
        "outline": "3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)",
        "outlineOffset": "3px"
      },
      "button:hover": {
        "backgroundColor": "var(--color-primary-hover)"
      },
      "button:focus-visible": {
        "outline": "3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)",
        "outlineOffset": "3px"
      },
      "button:active": {
        "transform": "translateY(1px)"
      },
      "button:disabled": {
        "opacity": "0.55",
        "cursor": "not-allowed"
      },
      "input:focus-visible": {
        "outline": "3px solid color-mix(in srgb, var(--color-primary) 35%, transparent)",
        "borderColor": "var(--color-primary)"
      },
      "input:disabled": {
        "opacity": "0.6",
        "cursor": "not-allowed"
      },
      "input:checked": {
        "accentColor": "var(--color-primary)"
      }
    },
    "responsive": {
      "tablet": {
        ":root": {
          "--body-padding": "var(--body-padding-sm)",
          "--section-spacing": "var(--section-spacing-sm)"
        },
        "table": {
          "fontSize": "var(--font-size-sm)"
        }
      },
      "mobile": {
        ":root": {
          "--body-padding": "var(--body-padding-xs)",
          "--space-2xl": "var(--space-2xl-xs)"
        },
        "h1": {
          "overflowWrap": "anywhere"
        }
      }
    }
  },
  "breakpoints": {
    "mobile": 390,
    "tablet": 768,
    "desktop": 1440
  },
  "options": {
    "includeMinimalReset": true,
    "reducedMotion": true
  }
} satisfies Theme

export const lavandaPreset = {
  "schemaVersion": 2,
  "metadata": {
    "name": "Lavanda",
    "description": "Soft lilac mist with violet accents for a calm, dreamy read.",
    "version": "1.0.0"
  },
  "tokens": {
    "colors": {
      "background": "#f4f1fa",
      "surface": "#eae4f5",
      "surfaceAlt": "#d9cfee",
      "text": "#2d2540",
      "textMuted": "#5f5478",
      "primary": "#6d28d9",
      "primaryHover": "#5a20b5",
      "primaryText": "#ffffff",
      "secondary": "#8b5cf6",
      "border": "#d2c7e8",
      "success": "#4d8a4a",
      "warning": "#96702a",
      "danger": "#b42318",
      "codeBackground": "#2d2540",
      "codeText": "#e8e2f8"
    },
    "typography": {
      "fontBody": "Inter, ui-sans-serif, system-ui, sans-serif",
      "fontHeading": "Inter, ui-sans-serif, system-ui, sans-serif",
      "fontMono": "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
      "fontSizeBase": "16px",
      "fontSizeXs": "0.75rem",
      "fontSizeSm": "0.875rem",
      "fontSizeMd": "1rem",
      "fontSizeLg": "1.25rem",
      "fontSizeXl": "2.25rem",
      "lineHeightBody": "1.65",
      "lineHeightHeading": "1.15",
      "fontWeightNormal": "400",
      "fontWeightMedium": "600",
      "fontWeightBold": "750"
    },
    "radius": {
      "radiusSm": "0.375rem",
      "radiusMd": "0.75rem",
      "radiusLg": "1.25rem",
      "radiusFull": "999px"
    },
    "shadow": {
      "shadowSm": "0 1px 2px rgb(110 80 180 / 0.12)",
      "shadowMd": "0 10px 28px rgb(110 80 180 / 0.14)",
      "shadowLg": "0 24px 55px rgb(110 80 180 / 0.18)"
    },
    "spacing": {
      "spaceXs": "0.25rem",
      "spaceSm": "0.5rem",
      "spaceMd": "1rem",
      "spaceLg": "1.5rem",
      "spaceXl": "2.25rem",
      "space2xl": "4rem",
      "space2xlXs": "2.5rem"
    },
    "layout": {
      "contentWidth": "72ch",
      "wideWidth": "1120px",
      "bodyPadding": "1.25rem",
      "sectionSpacing": "3rem",
      "headerWidth": "1120px",
      "footerWidth": "1120px",
      "bodyPaddingSm": "1rem",
      "bodyPaddingXs": "0.8rem",
      "sectionSpacingSm": "2rem"
    },
    "scroll": {
      "scrollbarWidth": "auto",
      "scrollbarSize": "12px",
      "scrollbarTrack": "var(--color-surface)",
      "scrollbarThumb": "var(--color-border)",
      "scrollbarThumbHover": "var(--color-text-muted)",
      "scrollbarRadius": "var(--radius-full)",
      "scrollbarGutter": "auto",
      "scrollBehavior": "auto",
      "scrollPaddingTop": "0",
      "overscrollBehavior": "auto"
    }
  },
  "modes": {
    "light": {
      "colors": {}
    },
    "dark": {
      "colors": {
        "background": "#17131f",
        "surface": "#201b2c",
        "surfaceAlt": "#2c2439",
        "text": "#e6e0f5",
        "textMuted": "#a99ac7",
        "primary": "#b79dff",
        "primaryHover": "#c9b3ff",
        "primaryText": "#1c1033",
        "border": "#3a3049",
        "codeBackground": "#0e0a14",
        "codeText": "#e6e0f5"
      }
    }
  },
  "layers": {
    "base": {
      "html": {
        "colorScheme": "light dark",
        "background": "var(--color-background)"
      },
      "h1, h2, h3, h4, h5, h6": {
        "fontFamily": "var(--font-heading)",
        "fontWeight": "var(--font-weight-bold)",
        "lineHeight": "var(--line-height-heading)",
        "marginBlock": "1.25em 0.5em"
      },
      "p, ul, ol, dl, blockquote, pre, figure, table, form, details": {
        "marginBlock": "0 var(--space-lg)"
      },
      "th, td": {
        "padding": "var(--space-sm) var(--space-md)",
        "verticalAlign": "top"
      },
      "label": {
        "display": "block",
        "marginBlock": "var(--space-sm)"
      },
      "input:not([type=\"checkbox\"]):not([type=\"radio\"]), textarea, select": {
        "width": "100%"
      },
      "input, textarea, select, button": {
        "background": "var(--color-surface)",
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-sm)",
        "color": "var(--color-text)",
        "font": "inherit",
        "padding": "0.65rem 0.8rem"
      },
      "button": {
        "background": "var(--color-primary)",
        "color": "var(--color-primary-text)"
      }
    },
    "elements": {
      "pre code": {
        "background": "transparent",
        "color": "inherit",
        "padding": "0"
      },
      "body": {
        "margin": "0",
        "backgroundColor": "var(--color-background)",
        "color": "var(--color-text)",
        "fontFamily": "var(--font-body)",
        "fontSize": "var(--font-size-base)",
        "lineHeight": "var(--line-height-body)"
      },
      "header": {
        "maxWidth": "var(--header-width)",
        "marginInline": "auto",
        "padding": "var(--space-lg) var(--body-padding)"
      },
      "nav": {
        "display": "flex",
        "gap": "var(--space-md)",
        "alignItems": "center",
        "flexWrap": "wrap"
      },
      "main": {
        "maxWidth": "var(--content-width)",
        "marginInline": "auto",
        "padding": "var(--space-lg) var(--body-padding) var(--space-2xl)"
      },
      "section": {
        "marginBlock": "var(--section-spacing)"
      },
      "article": {
        "backgroundColor": "var(--color-surface)",
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-md)",
        "padding": "var(--space-lg)",
        "boxShadow": "var(--shadow-sm)"
      },
      "aside": {
        "borderInlineStart": "4px solid var(--color-primary)",
        "backgroundColor": "var(--color-surface)",
        "padding": "var(--space-md)"
      },
      "footer": {
        "maxWidth": "var(--footer-width)",
        "marginInline": "auto",
        "padding": "var(--space-xl) var(--body-padding)",
        "color": "var(--color-text-muted)",
        "borderTop": "1px solid var(--color-border)"
      },
      "h1": {
        "fontSize": "clamp(2.2rem, 7vw, 4.25rem)",
        "letterSpacing": "-0.025em"
      },
      "h2": {
        "fontSize": "clamp(1.7rem, 5vw, 2.6rem)",
        "letterSpacing": "-0.02em"
      },
      "h3": {
        "fontSize": "1.5rem"
      },
      "h4": {
        "fontSize": "1.25rem"
      },
      "h5": {
        "fontSize": "1.05rem"
      },
      "h6": {
        "fontSize": "0.95rem",
        "textTransform": "uppercase",
        "letterSpacing": "0.08em"
      },
      "a": {
        "color": "var(--color-primary)",
        "textUnderlineOffset": "0.2em"
      },
      "mark": {
        "backgroundColor": "color-mix(in srgb, var(--color-warning) 25%, transparent)",
        "color": "inherit"
      },
      "blockquote": {
        "marginInline": "0",
        "padding": "var(--space-md) var(--space-lg)",
        "borderInlineStart": "4px solid var(--color-primary)",
        "color": "var(--color-text-muted)"
      },
      "hr": {
        "border": "0",
        "borderTop": "1px solid var(--color-border)",
        "marginBlock": "var(--space-xl)"
      },
      "code": {
        "fontFamily": "var(--font-mono)",
        "backgroundColor": "var(--color-surface-alt)",
        "borderRadius": "var(--radius-sm)",
        "padding": "0.1em 0.35em"
      },
      "pre": {
        "backgroundColor": "var(--color-code-background)",
        "color": "var(--color-code-text)",
        "padding": "var(--space-lg)",
        "borderRadius": "var(--radius-md)",
        "overflowX": "auto"
      },
      "kbd": {
        "fontFamily": "var(--font-mono)",
        "border": "1px solid var(--color-border)",
        "borderBottomWidth": "3px",
        "borderRadius": "var(--radius-sm)",
        "padding": "0.12rem 0.4rem",
        "backgroundColor": "var(--color-surface)"
      },
      "table": {
        "width": "100%",
        "borderCollapse": "collapse",
        "marginBlock": "var(--space-lg)"
      },
      "th": {
        "textAlign": "left",
        "backgroundColor": "var(--color-surface)"
      },
      "td": {
        "borderTop": "1px solid var(--color-border)"
      },
      "caption": {
        "color": "var(--color-text-muted)",
        "marginBottom": "var(--space-sm)",
        "textAlign": "left"
      },
      "fieldset": {
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-md)",
        "padding": "var(--space-lg)"
      },
      "input": {
        "boxSizing": "border-box"
      },
      "textarea": {
        "width": "100%",
        "boxSizing": "border-box",
        "minHeight": "7rem",
        "resize": "vertical"
      },
      "select": {
        "width": "100%",
        "boxSizing": "border-box"
      },
      "button": {
        "cursor": "pointer",
        "fontWeight": "var(--font-weight-medium)"
      },
      "img": {
        "maxWidth": "100%",
        "height": "auto",
        "borderRadius": "var(--radius-md)"
      },
      "figure": {
        "marginInline": "0"
      },
      "figcaption": {
        "color": "var(--color-text-muted)",
        "fontSize": "var(--font-size-sm)"
      },
      "details": {
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-md)",
        "padding": "var(--space-md)"
      },
      "summary": {
        "cursor": "pointer",
        "fontWeight": "var(--font-weight-medium)"
      }
    },
    "states": {
      "a:hover": {
        "color": "var(--color-primary-hover)"
      },
      "a:focus-visible": {
        "outline": "3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)",
        "outlineOffset": "3px"
      },
      "button:hover": {
        "backgroundColor": "var(--color-primary-hover)"
      },
      "button:focus-visible": {
        "outline": "3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)",
        "outlineOffset": "3px"
      },
      "button:active": {
        "transform": "translateY(1px)"
      },
      "button:disabled": {
        "opacity": "0.55",
        "cursor": "not-allowed"
      },
      "input:focus-visible": {
        "outline": "3px solid color-mix(in srgb, var(--color-primary) 35%, transparent)",
        "borderColor": "var(--color-primary)"
      },
      "input:disabled": {
        "opacity": "0.6",
        "cursor": "not-allowed"
      },
      "input:checked": {
        "accentColor": "var(--color-primary)"
      }
    },
    "responsive": {
      "tablet": {
        ":root": {
          "--body-padding": "var(--body-padding-sm)",
          "--section-spacing": "var(--section-spacing-sm)"
        },
        "table": {
          "fontSize": "var(--font-size-sm)"
        }
      },
      "mobile": {
        ":root": {
          "--body-padding": "var(--body-padding-xs)",
          "--space-2xl": "var(--space-2xl-xs)"
        },
        "h1": {
          "overflowWrap": "anywhere"
        }
      }
    }
  },
  "breakpoints": {
    "mobile": 390,
    "tablet": 768,
    "desktop": 1440
  },
  "options": {
    "includeMinimalReset": true,
    "reducedMotion": true
  }
} satisfies Theme

export const cyberpunkPreset = {
  "schemaVersion": 2,
  "metadata": {
    "name": "Cyberpunk",
    "description": "Neon pink and cyan on near-black for a high-voltage night drive.",
    "version": "1.0.0"
  },
  "tokens": {
    "colors": {
      "background": "#0a0a12",
      "surface": "#131320",
      "surfaceAlt": "#1c1c30",
      "text": "#e8f0ff",
      "textMuted": "#8b93b0",
      "primary": "#ff2e88",
      "primaryHover": "#ff5fa3",
      "primaryText": "#1a0010",
      "secondary": "#00e5ff",
      "border": "#2e2e4d",
      "success": "#00e676",
      "warning": "#ffea00",
      "danger": "#ff3131",
      "codeBackground": "#050508",
      "codeText": "#c9f3ff"
    },
    "typography": {
      "fontBody": "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
      "fontHeading": "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
      "fontMono": "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
      "fontSizeBase": "15px",
      "fontSizeXs": "0.75rem",
      "fontSizeSm": "0.875rem",
      "fontSizeMd": "1rem",
      "fontSizeLg": "1.25rem",
      "fontSizeXl": "2.25rem",
      "lineHeightBody": "1.55",
      "lineHeightHeading": "1.15",
      "fontWeightNormal": "400",
      "fontWeightMedium": "600",
      "fontWeightBold": "700"
    },
    "radius": {
      "radiusSm": "0",
      "radiusMd": "0",
      "radiusLg": "0",
      "radiusFull": "999px"
    },
    "shadow": {
      "shadowSm": "0 0 8px rgb(255 46 136 / 0.35)",
      "shadowMd": "0 0 20px rgb(255 46 136 / 0.30)",
      "shadowLg": "0 0 40px rgb(0 229 255 / 0.25)"
    },
    "spacing": {
      "spaceXs": "0.25rem",
      "spaceSm": "0.5rem",
      "spaceMd": "1rem",
      "spaceLg": "1.5rem",
      "spaceXl": "2.25rem",
      "space2xl": "4rem",
      "space2xlXs": "2.5rem"
    },
    "layout": {
      "contentWidth": "72ch",
      "wideWidth": "1120px",
      "bodyPadding": "1.25rem",
      "sectionSpacing": "3rem",
      "headerWidth": "1120px",
      "footerWidth": "1120px",
      "bodyPaddingSm": "1rem",
      "bodyPaddingXs": "0.8rem",
      "sectionSpacingSm": "2rem"
    },
    "scroll": {
      "scrollbarWidth": "auto",
      "scrollbarSize": "12px",
      "scrollbarTrack": "var(--color-surface)",
      "scrollbarThumb": "var(--color-border)",
      "scrollbarThumbHover": "var(--color-text-muted)",
      "scrollbarRadius": "var(--radius-full)",
      "scrollbarGutter": "auto",
      "scrollBehavior": "auto",
      "scrollPaddingTop": "0",
      "overscrollBehavior": "auto"
    }
  },
  "modes": {
    "light": {
      "colors": {}
    },
    "dark": {
      "colors": {
        "background": "#06060c",
        "surface": "#0e0e18",
        "surfaceAlt": "#171726",
        "text": "#e8f0ff",
        "textMuted": "#8b93b0",
        "primary": "#ff2e88",
        "primaryHover": "#ff5fa3",
        "primaryText": "#1a0010",
        "border": "#26263c",
        "codeBackground": "#030304",
        "codeText": "#c9f3ff"
      }
    }
  },
  "layers": {
    "base": {
      "html": {
        "colorScheme": "light dark",
        "background": "var(--color-background)"
      },
      "h1, h2, h3, h4, h5, h6": {
        "fontFamily": "var(--font-heading)",
        "fontWeight": "var(--font-weight-bold)",
        "lineHeight": "var(--line-height-heading)",
        "marginBlock": "1.25em 0.5em"
      },
      "p, ul, ol, dl, blockquote, pre, figure, table, form, details": {
        "marginBlock": "0 var(--space-lg)"
      },
      "th, td": {
        "padding": "var(--space-sm) var(--space-md)",
        "verticalAlign": "top"
      },
      "label": {
        "display": "block",
        "marginBlock": "var(--space-sm)"
      },
      "input:not([type=\"checkbox\"]):not([type=\"radio\"]), textarea, select": {
        "width": "100%"
      },
      "input, textarea, select, button": {
        "background": "var(--color-surface)",
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-sm)",
        "color": "var(--color-text)",
        "font": "inherit",
        "padding": "0.65rem 0.8rem"
      },
      "button": {
        "background": "var(--color-primary)",
        "color": "var(--color-primary-text)"
      }
    },
    "elements": {
      "pre code": {
        "background": "transparent",
        "color": "inherit",
        "padding": "0"
      },
      "body": {
        "margin": "0",
        "backgroundColor": "var(--color-background)",
        "color": "var(--color-text)",
        "fontFamily": "var(--font-body)",
        "fontSize": "var(--font-size-base)",
        "lineHeight": "var(--line-height-body)"
      },
      "header": {
        "maxWidth": "var(--header-width)",
        "marginInline": "auto",
        "padding": "var(--space-lg) var(--body-padding)"
      },
      "nav": {
        "display": "flex",
        "gap": "var(--space-md)",
        "alignItems": "center",
        "flexWrap": "wrap"
      },
      "main": {
        "maxWidth": "var(--content-width)",
        "marginInline": "auto",
        "padding": "var(--space-lg) var(--body-padding) var(--space-2xl)"
      },
      "section": {
        "marginBlock": "var(--section-spacing)"
      },
      "article": {
        "backgroundColor": "var(--color-surface)",
        "border": "1px solid var(--color-border)",
        "borderRadius": "0",
        "padding": "var(--space-lg)",
        "boxShadow": "none"
      },
      "aside": {
        "borderInlineStart": "4px solid var(--color-primary)",
        "backgroundColor": "var(--color-surface)",
        "padding": "var(--space-md)"
      },
      "footer": {
        "maxWidth": "var(--footer-width)",
        "marginInline": "auto",
        "padding": "var(--space-xl) var(--body-padding)",
        "color": "var(--color-text-muted)",
        "borderTop": "1px solid var(--color-border)"
      },
      "h1": {
        "fontSize": "2.1rem",
        "textTransform": "uppercase",
        "letterSpacing": "0.05em",
        "color": "var(--color-primary)"
      },
      "h2": {
        "fontSize": "1.4rem",
        "textTransform": "uppercase",
        "letterSpacing": "0.04em",
        "color": "var(--color-secondary)"
      },
      "h3": {
        "fontSize": "1.5rem"
      },
      "h4": {
        "fontSize": "1.25rem"
      },
      "h5": {
        "fontSize": "1.05rem"
      },
      "h6": {
        "fontSize": "0.95rem",
        "textTransform": "uppercase",
        "letterSpacing": "0.08em"
      },
      "a": {
        "color": "var(--color-secondary)",
        "textDecoration": "underline"
      },
      "mark": {
        "backgroundColor": "color-mix(in srgb, var(--color-warning) 25%, transparent)",
        "color": "inherit"
      },
      "blockquote": {
        "marginInline": "0",
        "padding": "var(--space-md) var(--space-lg)",
        "borderInlineStart": "4px solid var(--color-secondary)",
        "color": "var(--color-text-muted)"
      },
      "hr": {
        "border": "0",
        "borderTop": "1px solid var(--color-border)",
        "marginBlock": "var(--space-xl)"
      },
      "code": {
        "fontFamily": "var(--font-mono)",
        "backgroundColor": "var(--color-surface-alt)",
        "borderRadius": "var(--radius-sm)",
        "padding": "0.1em 0.35em",
        "color": "var(--color-secondary)"
      },
      "pre": {
        "backgroundColor": "var(--color-code-background)",
        "color": "var(--color-code-text)",
        "padding": "var(--space-lg)",
        "borderRadius": "var(--radius-md)",
        "overflowX": "auto"
      },
      "kbd": {
        "fontFamily": "var(--font-mono)",
        "border": "1px solid var(--color-border)",
        "borderBottomWidth": "3px",
        "borderRadius": "var(--radius-sm)",
        "padding": "0.12rem 0.4rem",
        "backgroundColor": "var(--color-surface)"
      },
      "table": {
        "width": "100%",
        "borderCollapse": "collapse",
        "marginBlock": "var(--space-lg)"
      },
      "th": {
        "textAlign": "left",
        "backgroundColor": "var(--color-surface)"
      },
      "td": {
        "borderTop": "1px solid var(--color-border)"
      },
      "caption": {
        "color": "var(--color-text-muted)",
        "marginBottom": "var(--space-sm)",
        "textAlign": "left"
      },
      "fieldset": {
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-md)",
        "padding": "var(--space-lg)"
      },
      "input": {
        "boxSizing": "border-box"
      },
      "textarea": {
        "width": "100%",
        "boxSizing": "border-box",
        "minHeight": "7rem",
        "resize": "vertical"
      },
      "select": {
        "width": "100%",
        "boxSizing": "border-box"
      },
      "button": {
        "cursor": "pointer",
        "fontWeight": "var(--font-weight-medium)",
        "textTransform": "uppercase",
        "letterSpacing": "0.08em"
      },
      "img": {
        "maxWidth": "100%",
        "height": "auto",
        "borderRadius": "var(--radius-md)"
      },
      "figure": {
        "marginInline": "0"
      },
      "figcaption": {
        "color": "var(--color-text-muted)",
        "fontSize": "var(--font-size-sm)"
      },
      "details": {
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-md)",
        "padding": "var(--space-md)"
      },
      "summary": {
        "cursor": "pointer",
        "fontWeight": "var(--font-weight-medium)"
      }
    },
    "states": {
      "a:hover": {
        "color": "var(--color-primary-hover)"
      },
      "a:focus-visible": {
        "outline": "3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)",
        "outlineOffset": "3px"
      },
      "button:hover": {
        "backgroundColor": "var(--color-primary-hover)"
      },
      "button:focus-visible": {
        "outline": "3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)",
        "outlineOffset": "3px"
      },
      "button:active": {
        "transform": "translateY(1px)"
      },
      "button:disabled": {
        "opacity": "0.55",
        "cursor": "not-allowed"
      },
      "input:focus-visible": {
        "outline": "3px solid color-mix(in srgb, var(--color-primary) 35%, transparent)",
        "borderColor": "var(--color-primary)"
      },
      "input:disabled": {
        "opacity": "0.6",
        "cursor": "not-allowed"
      },
      "input:checked": {
        "accentColor": "var(--color-primary)"
      }
    },
    "responsive": {
      "tablet": {
        ":root": {
          "--body-padding": "var(--body-padding-sm)",
          "--section-spacing": "var(--section-spacing-sm)"
        },
        "table": {
          "fontSize": "var(--font-size-sm)"
        }
      },
      "mobile": {
        ":root": {
          "--body-padding": "var(--body-padding-xs)",
          "--space-2xl": "var(--space-2xl-xs)"
        },
        "h1": {
          "overflowWrap": "anywhere"
        }
      }
    }
  },
  "breakpoints": {
    "mobile": 390,
    "tablet": 768,
    "desktop": 1440
  },
  "options": {
    "includeMinimalReset": true,
    "reducedMotion": true
  }
} satisfies Theme

export const draculaPreset = {
  "schemaVersion": 2,
  "metadata": {
    "name": "Drácula",
    "description": "The beloved dark purple palette with pink and cyan accents.",
    "version": "1.0.0"
  },
  "tokens": {
    "colors": {
      "background": "#282a36",
      "surface": "#343746",
      "surfaceAlt": "#44475a",
      "text": "#f8f8f2",
      "textMuted": "#a0a8c8",
      "primary": "#bd93f9",
      "primaryHover": "#d0aefb",
      "primaryText": "#241531",
      "secondary": "#8be9fd",
      "border": "#4a4e69",
      "success": "#50fa7b",
      "warning": "#ffb86c",
      "danger": "#ff5555",
      "codeBackground": "#1e1f29",
      "codeText": "#f8f8f2"
    },
    "typography": {
      "fontBody": "Inter, ui-sans-serif, system-ui, sans-serif",
      "fontHeading": "Inter, ui-sans-serif, system-ui, sans-serif",
      "fontMono": "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
      "fontSizeBase": "16px",
      "fontSizeXs": "0.75rem",
      "fontSizeSm": "0.875rem",
      "fontSizeMd": "1rem",
      "fontSizeLg": "1.25rem",
      "fontSizeXl": "2.25rem",
      "lineHeightBody": "1.65",
      "lineHeightHeading": "1.15",
      "fontWeightNormal": "400",
      "fontWeightMedium": "600",
      "fontWeightBold": "750"
    },
    "radius": {
      "radiusSm": "0.375rem",
      "radiusMd": "0.5rem",
      "radiusLg": "0.75rem",
      "radiusFull": "999px"
    },
    "shadow": {
      "shadowSm": "0 1px 2px rgb(0 0 0 / 0.4)",
      "shadowMd": "0 12px 30px rgb(0 0 0 / 0.45)",
      "shadowLg": "0 24px 55px rgb(40 20 60 / 0.5)"
    },
    "spacing": {
      "spaceXs": "0.25rem",
      "spaceSm": "0.5rem",
      "spaceMd": "1rem",
      "spaceLg": "1.5rem",
      "spaceXl": "2.25rem",
      "space2xl": "4rem",
      "space2xlXs": "2.5rem"
    },
    "layout": {
      "contentWidth": "72ch",
      "wideWidth": "1120px",
      "bodyPadding": "1.25rem",
      "sectionSpacing": "3rem",
      "headerWidth": "1120px",
      "footerWidth": "1120px",
      "bodyPaddingSm": "1rem",
      "bodyPaddingXs": "0.8rem",
      "sectionSpacingSm": "2rem"
    },
    "scroll": {
      "scrollbarWidth": "auto",
      "scrollbarSize": "12px",
      "scrollbarTrack": "var(--color-surface)",
      "scrollbarThumb": "var(--color-border)",
      "scrollbarThumbHover": "var(--color-text-muted)",
      "scrollbarRadius": "var(--radius-full)",
      "scrollbarGutter": "auto",
      "scrollBehavior": "auto",
      "scrollPaddingTop": "0",
      "overscrollBehavior": "auto"
    }
  },
  "modes": {
    "light": {
      "colors": {}
    },
    "dark": {
      "colors": {
        "background": "#191a23",
        "surface": "#22232e",
        "surfaceAlt": "#2f3142",
        "text": "#f8f8f2",
        "textMuted": "#a0a8c8",
        "primary": "#bd93f9",
        "primaryHover": "#d0aefb",
        "primaryText": "#241531",
        "border": "#3d4058",
        "codeBackground": "#121319",
        "codeText": "#f8f8f2"
      }
    }
  },
  "layers": {
    "base": {
      "html": {
        "colorScheme": "light dark",
        "background": "var(--color-background)"
      },
      "h1, h2, h3, h4, h5, h6": {
        "fontFamily": "var(--font-heading)",
        "fontWeight": "var(--font-weight-bold)",
        "lineHeight": "var(--line-height-heading)",
        "marginBlock": "1.25em 0.5em"
      },
      "p, ul, ol, dl, blockquote, pre, figure, table, form, details": {
        "marginBlock": "0 var(--space-lg)"
      },
      "th, td": {
        "padding": "var(--space-sm) var(--space-md)",
        "verticalAlign": "top"
      },
      "label": {
        "display": "block",
        "marginBlock": "var(--space-sm)"
      },
      "input:not([type=\"checkbox\"]):not([type=\"radio\"]), textarea, select": {
        "width": "100%"
      },
      "input, textarea, select, button": {
        "background": "var(--color-surface)",
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-sm)",
        "color": "var(--color-text)",
        "font": "inherit",
        "padding": "0.65rem 0.8rem"
      },
      "button": {
        "background": "var(--color-primary)",
        "color": "var(--color-primary-text)"
      }
    },
    "elements": {
      "pre code": {
        "background": "transparent",
        "color": "inherit",
        "padding": "0"
      },
      "body": {
        "margin": "0",
        "backgroundColor": "var(--color-background)",
        "color": "var(--color-text)",
        "fontFamily": "var(--font-body)",
        "fontSize": "var(--font-size-base)",
        "lineHeight": "var(--line-height-body)"
      },
      "header": {
        "maxWidth": "var(--header-width)",
        "marginInline": "auto",
        "padding": "var(--space-lg) var(--body-padding)"
      },
      "nav": {
        "display": "flex",
        "gap": "var(--space-md)",
        "alignItems": "center",
        "flexWrap": "wrap"
      },
      "main": {
        "maxWidth": "var(--content-width)",
        "marginInline": "auto",
        "padding": "var(--space-lg) var(--body-padding) var(--space-2xl)"
      },
      "section": {
        "marginBlock": "var(--section-spacing)"
      },
      "article": {
        "backgroundColor": "var(--color-surface)",
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-md)",
        "padding": "var(--space-lg)",
        "boxShadow": "var(--shadow-sm)"
      },
      "aside": {
        "borderInlineStart": "4px solid var(--color-primary)",
        "backgroundColor": "var(--color-surface)",
        "padding": "var(--space-md)"
      },
      "footer": {
        "maxWidth": "var(--footer-width)",
        "marginInline": "auto",
        "padding": "var(--space-xl) var(--body-padding)",
        "color": "var(--color-text-muted)",
        "borderTop": "1px solid var(--color-border)"
      },
      "h1": {
        "fontSize": "clamp(2.2rem, 7vw, 4.25rem)",
        "letterSpacing": "-0.02em"
      },
      "h2": {
        "fontSize": "clamp(1.7rem, 5vw, 2.6rem)",
        "letterSpacing": "-0.015em"
      },
      "h3": {
        "fontSize": "1.5rem"
      },
      "h4": {
        "fontSize": "1.25rem"
      },
      "h5": {
        "fontSize": "1.05rem"
      },
      "h6": {
        "fontSize": "0.95rem",
        "textTransform": "uppercase",
        "letterSpacing": "0.08em"
      },
      "a": {
        "color": "var(--color-primary)",
        "textUnderlineOffset": "0.2em"
      },
      "mark": {
        "backgroundColor": "color-mix(in srgb, var(--color-warning) 25%, transparent)",
        "color": "inherit"
      },
      "blockquote": {
        "marginInline": "0",
        "padding": "var(--space-md) var(--space-lg)",
        "borderInlineStart": "4px solid var(--color-primary)",
        "color": "var(--color-text-muted)"
      },
      "hr": {
        "border": "0",
        "borderTop": "1px solid var(--color-border)",
        "marginBlock": "var(--space-xl)"
      },
      "code": {
        "fontFamily": "var(--font-mono)",
        "backgroundColor": "var(--color-surface-alt)",
        "borderRadius": "var(--radius-sm)",
        "padding": "0.1em 0.35em",
        "color": "var(--color-secondary)"
      },
      "pre": {
        "backgroundColor": "var(--color-code-background)",
        "color": "var(--color-code-text)",
        "padding": "var(--space-lg)",
        "borderRadius": "var(--radius-md)",
        "overflowX": "auto",
        "border": "1px solid var(--color-border)"
      },
      "kbd": {
        "fontFamily": "var(--font-mono)",
        "border": "1px solid var(--color-border)",
        "borderBottomWidth": "3px",
        "borderRadius": "var(--radius-sm)",
        "padding": "0.12rem 0.4rem",
        "backgroundColor": "var(--color-surface)"
      },
      "table": {
        "width": "100%",
        "borderCollapse": "collapse",
        "marginBlock": "var(--space-lg)"
      },
      "th": {
        "textAlign": "left",
        "backgroundColor": "var(--color-surface)"
      },
      "td": {
        "borderTop": "1px solid var(--color-border)"
      },
      "caption": {
        "color": "var(--color-text-muted)",
        "marginBottom": "var(--space-sm)",
        "textAlign": "left"
      },
      "fieldset": {
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-md)",
        "padding": "var(--space-lg)"
      },
      "input": {
        "boxSizing": "border-box"
      },
      "textarea": {
        "width": "100%",
        "boxSizing": "border-box",
        "minHeight": "7rem",
        "resize": "vertical"
      },
      "select": {
        "width": "100%",
        "boxSizing": "border-box"
      },
      "button": {
        "cursor": "pointer",
        "fontWeight": "var(--font-weight-medium)"
      },
      "img": {
        "maxWidth": "100%",
        "height": "auto",
        "borderRadius": "var(--radius-md)"
      },
      "figure": {
        "marginInline": "0"
      },
      "figcaption": {
        "color": "var(--color-text-muted)",
        "fontSize": "var(--font-size-sm)"
      },
      "details": {
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-md)",
        "padding": "var(--space-md)"
      },
      "summary": {
        "cursor": "pointer",
        "fontWeight": "var(--font-weight-medium)"
      }
    },
    "states": {
      "a:hover": {
        "color": "var(--color-primary-hover)"
      },
      "a:focus-visible": {
        "outline": "3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)",
        "outlineOffset": "3px"
      },
      "button:hover": {
        "backgroundColor": "var(--color-primary-hover)"
      },
      "button:focus-visible": {
        "outline": "3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)",
        "outlineOffset": "3px"
      },
      "button:active": {
        "transform": "translateY(1px)"
      },
      "button:disabled": {
        "opacity": "0.55",
        "cursor": "not-allowed"
      },
      "input:focus-visible": {
        "outline": "3px solid color-mix(in srgb, var(--color-primary) 35%, transparent)",
        "borderColor": "var(--color-primary)"
      },
      "input:disabled": {
        "opacity": "0.6",
        "cursor": "not-allowed"
      },
      "input:checked": {
        "accentColor": "var(--color-primary)"
      }
    },
    "responsive": {
      "tablet": {
        ":root": {
          "--body-padding": "var(--body-padding-sm)",
          "--section-spacing": "var(--section-spacing-sm)"
        },
        "table": {
          "fontSize": "var(--font-size-sm)"
        }
      },
      "mobile": {
        ":root": {
          "--body-padding": "var(--body-padding-xs)",
          "--space-2xl": "var(--space-2xl-xs)"
        },
        "h1": {
          "overflowWrap": "anywhere"
        }
      }
    }
  },
  "breakpoints": {
    "mobile": 390,
    "tablet": 768,
    "desktop": 1440
  },
  "options": {
    "includeMinimalReset": true,
    "reducedMotion": true
  }
} satisfies Theme

export const meiaNoitePreset = {
  "schemaVersion": 2,
  "metadata": {
    "name": "Meia-noite",
    "description": "Deep navy night with electric-blue highlights for late sessions.",
    "version": "1.0.0"
  },
  "tokens": {
    "colors": {
      "background": "#0b1220",
      "surface": "#131c30",
      "surfaceAlt": "#1c2942",
      "text": "#dbe4f5",
      "textMuted": "#93a1bd",
      "primary": "#5b9cff",
      "primaryHover": "#7fb3ff",
      "primaryText": "#06121f",
      "secondary": "#7dd3fc",
      "border": "#25324b",
      "success": "#4ade80",
      "warning": "#fbbf24",
      "danger": "#f87171",
      "codeBackground": "#060b14",
      "codeText": "#dbe4f5"
    },
    "typography": {
      "fontBody": "Inter, ui-sans-serif, system-ui, sans-serif",
      "fontHeading": "Inter, ui-sans-serif, system-ui, sans-serif",
      "fontMono": "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
      "fontSizeBase": "16px",
      "fontSizeXs": "0.75rem",
      "fontSizeSm": "0.875rem",
      "fontSizeMd": "1rem",
      "fontSizeLg": "1.25rem",
      "fontSizeXl": "2.25rem",
      "lineHeightBody": "1.65",
      "lineHeightHeading": "1.15",
      "fontWeightNormal": "400",
      "fontWeightMedium": "600",
      "fontWeightBold": "750"
    },
    "radius": {
      "radiusSm": "0.375rem",
      "radiusMd": "0.625rem",
      "radiusLg": "1rem",
      "radiusFull": "999px"
    },
    "shadow": {
      "shadowSm": "0 1px 2px rgb(0 0 0 / 0.45)",
      "shadowMd": "0 12px 32px rgb(0 0 0 / 0.5)",
      "shadowLg": "0 24px 60px rgb(20 60 140 / 0.35)"
    },
    "spacing": {
      "spaceXs": "0.25rem",
      "spaceSm": "0.5rem",
      "spaceMd": "1rem",
      "spaceLg": "1.5rem",
      "spaceXl": "2.25rem",
      "space2xl": "4rem",
      "space2xlXs": "2.5rem"
    },
    "layout": {
      "contentWidth": "72ch",
      "wideWidth": "1120px",
      "bodyPadding": "1.25rem",
      "sectionSpacing": "3rem",
      "headerWidth": "1120px",
      "footerWidth": "1120px",
      "bodyPaddingSm": "1rem",
      "bodyPaddingXs": "0.8rem",
      "sectionSpacingSm": "2rem"
    },
    "scroll": {
      "scrollbarWidth": "auto",
      "scrollbarSize": "12px",
      "scrollbarTrack": "var(--color-surface)",
      "scrollbarThumb": "var(--color-border)",
      "scrollbarThumbHover": "var(--color-text-muted)",
      "scrollbarRadius": "var(--radius-full)",
      "scrollbarGutter": "auto",
      "scrollBehavior": "auto",
      "scrollPaddingTop": "0",
      "overscrollBehavior": "auto"
    }
  },
  "modes": {
    "light": {
      "colors": {}
    },
    "dark": {
      "colors": {
        "background": "#070d18",
        "surface": "#0e1626",
        "surfaceAlt": "#16233a",
        "text": "#dbe4f5",
        "textMuted": "#93a1bd",
        "primary": "#5b9cff",
        "primaryHover": "#7fb3ff",
        "primaryText": "#06121f",
        "border": "#1e2a42",
        "codeBackground": "#04070e",
        "codeText": "#dbe4f5"
      }
    }
  },
  "layers": {
    "base": {
      "html": {
        "colorScheme": "light dark",
        "background": "var(--color-background)"
      },
      "h1, h2, h3, h4, h5, h6": {
        "fontFamily": "var(--font-heading)",
        "fontWeight": "var(--font-weight-bold)",
        "lineHeight": "var(--line-height-heading)",
        "marginBlock": "1.25em 0.5em"
      },
      "p, ul, ol, dl, blockquote, pre, figure, table, form, details": {
        "marginBlock": "0 var(--space-lg)"
      },
      "th, td": {
        "padding": "var(--space-sm) var(--space-md)",
        "verticalAlign": "top"
      },
      "label": {
        "display": "block",
        "marginBlock": "var(--space-sm)"
      },
      "input:not([type=\"checkbox\"]):not([type=\"radio\"]), textarea, select": {
        "width": "100%"
      },
      "input, textarea, select, button": {
        "background": "var(--color-surface)",
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-sm)",
        "color": "var(--color-text)",
        "font": "inherit",
        "padding": "0.65rem 0.8rem"
      },
      "button": {
        "background": "var(--color-primary)",
        "color": "var(--color-primary-text)"
      }
    },
    "elements": {
      "pre code": {
        "background": "transparent",
        "color": "inherit",
        "padding": "0"
      },
      "body": {
        "margin": "0",
        "backgroundColor": "var(--color-background)",
        "color": "var(--color-text)",
        "fontFamily": "var(--font-body)",
        "fontSize": "var(--font-size-base)",
        "lineHeight": "var(--line-height-body)"
      },
      "header": {
        "maxWidth": "var(--header-width)",
        "marginInline": "auto",
        "padding": "var(--space-lg) var(--body-padding)"
      },
      "nav": {
        "display": "flex",
        "gap": "var(--space-md)",
        "alignItems": "center",
        "flexWrap": "wrap"
      },
      "main": {
        "maxWidth": "var(--content-width)",
        "marginInline": "auto",
        "padding": "var(--space-lg) var(--body-padding) var(--space-2xl)"
      },
      "section": {
        "marginBlock": "var(--section-spacing)"
      },
      "article": {
        "backgroundColor": "var(--color-surface)",
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-md)",
        "padding": "var(--space-lg)",
        "boxShadow": "var(--shadow-sm)"
      },
      "aside": {
        "borderInlineStart": "4px solid var(--color-primary)",
        "backgroundColor": "var(--color-surface)",
        "padding": "var(--space-md)"
      },
      "footer": {
        "maxWidth": "var(--footer-width)",
        "marginInline": "auto",
        "padding": "var(--space-xl) var(--body-padding)",
        "color": "var(--color-text-muted)",
        "borderTop": "1px solid var(--color-border)"
      },
      "h1": {
        "fontSize": "clamp(2.2rem, 7vw, 4.25rem)",
        "letterSpacing": "-0.025em"
      },
      "h2": {
        "fontSize": "clamp(1.7rem, 5vw, 2.6rem)",
        "letterSpacing": "-0.02em"
      },
      "h3": {
        "fontSize": "1.5rem"
      },
      "h4": {
        "fontSize": "1.25rem"
      },
      "h5": {
        "fontSize": "1.05rem"
      },
      "h6": {
        "fontSize": "0.95rem",
        "textTransform": "uppercase",
        "letterSpacing": "0.08em"
      },
      "a": {
        "color": "var(--color-primary)",
        "textUnderlineOffset": "0.2em"
      },
      "mark": {
        "backgroundColor": "color-mix(in srgb, var(--color-warning) 25%, transparent)",
        "color": "inherit"
      },
      "blockquote": {
        "marginInline": "0",
        "padding": "var(--space-md) var(--space-lg)",
        "borderInlineStart": "4px solid var(--color-primary)",
        "color": "var(--color-text)"
      },
      "hr": {
        "border": "0",
        "borderTop": "1px solid var(--color-border)",
        "marginBlock": "var(--space-xl)"
      },
      "code": {
        "fontFamily": "var(--font-mono)",
        "backgroundColor": "var(--color-surface-alt)",
        "borderRadius": "var(--radius-sm)",
        "padding": "0.1em 0.35em"
      },
      "pre": {
        "backgroundColor": "var(--color-code-background)",
        "color": "var(--color-code-text)",
        "padding": "var(--space-lg)",
        "borderRadius": "var(--radius-md)",
        "overflowX": "auto"
      },
      "kbd": {
        "fontFamily": "var(--font-mono)",
        "border": "1px solid var(--color-border)",
        "borderBottomWidth": "3px",
        "borderRadius": "var(--radius-sm)",
        "padding": "0.12rem 0.4rem",
        "backgroundColor": "var(--color-surface)"
      },
      "table": {
        "width": "100%",
        "borderCollapse": "collapse",
        "marginBlock": "var(--space-lg)"
      },
      "th": {
        "textAlign": "left",
        "backgroundColor": "var(--color-surface)"
      },
      "td": {
        "borderTop": "1px solid var(--color-border)"
      },
      "caption": {
        "color": "var(--color-text-muted)",
        "marginBottom": "var(--space-sm)",
        "textAlign": "left"
      },
      "fieldset": {
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-md)",
        "padding": "var(--space-lg)"
      },
      "input": {
        "boxSizing": "border-box"
      },
      "textarea": {
        "width": "100%",
        "boxSizing": "border-box",
        "minHeight": "7rem",
        "resize": "vertical"
      },
      "select": {
        "width": "100%",
        "boxSizing": "border-box"
      },
      "button": {
        "cursor": "pointer",
        "fontWeight": "var(--font-weight-medium)"
      },
      "img": {
        "maxWidth": "100%",
        "height": "auto",
        "borderRadius": "var(--radius-md)"
      },
      "figure": {
        "marginInline": "0"
      },
      "figcaption": {
        "color": "var(--color-text-muted)",
        "fontSize": "var(--font-size-sm)"
      },
      "details": {
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-md)",
        "padding": "var(--space-md)"
      },
      "summary": {
        "cursor": "pointer",
        "fontWeight": "var(--font-weight-medium)"
      }
    },
    "states": {
      "a:hover": {
        "color": "var(--color-primary-hover)"
      },
      "a:focus-visible": {
        "outline": "3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)",
        "outlineOffset": "3px"
      },
      "button:hover": {
        "backgroundColor": "var(--color-primary-hover)"
      },
      "button:focus-visible": {
        "outline": "3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)",
        "outlineOffset": "3px"
      },
      "button:active": {
        "transform": "translateY(1px)"
      },
      "button:disabled": {
        "opacity": "0.55",
        "cursor": "not-allowed"
      },
      "input:focus-visible": {
        "outline": "3px solid color-mix(in srgb, var(--color-primary) 35%, transparent)",
        "borderColor": "var(--color-primary)"
      },
      "input:disabled": {
        "opacity": "0.6",
        "cursor": "not-allowed"
      },
      "input:checked": {
        "accentColor": "var(--color-primary)"
      }
    },
    "responsive": {
      "tablet": {
        ":root": {
          "--body-padding": "var(--body-padding-sm)",
          "--section-spacing": "var(--section-spacing-sm)"
        },
        "table": {
          "fontSize": "var(--font-size-sm)"
        }
      },
      "mobile": {
        ":root": {
          "--body-padding": "var(--body-padding-xs)",
          "--space-2xl": "var(--space-2xl-xs)"
        },
        "h1": {
          "overflowWrap": "anywhere"
        }
      }
    }
  },
  "breakpoints": {
    "mobile": 390,
    "tablet": 768,
    "desktop": 1440
  },
  "options": {
    "includeMinimalReset": true,
    "reducedMotion": true
  }
} satisfies Theme

export const brutalistaPreset = {
  "schemaVersion": 2,
  "metadata": {
    "name": "Brutalista",
    "description": "Raw black borders, hard shadows and uppercase type. No softness.",
    "version": "1.0.0"
  },
  "tokens": {
    "colors": {
      "background": "#ffffff",
      "surface": "#ffffff",
      "surfaceAlt": "#ffdd00",
      "text": "#000000",
      "textMuted": "#333333",
      "primary": "#0000ee",
      "primaryHover": "#0000bb",
      "primaryText": "#ffffff",
      "secondary": "#ffdd00",
      "border": "#000000",
      "success": "#007700",
      "warning": "#b26a00",
      "danger": "#cc0000",
      "codeBackground": "#111111",
      "codeText": "#f5f5f5"
    },
    "typography": {
      "fontBody": "Arial, Helvetica, sans-serif",
      "fontHeading": "Arial, Helvetica, sans-serif",
      "fontMono": "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
      "fontSizeBase": "16px",
      "fontSizeXs": "0.75rem",
      "fontSizeSm": "0.875rem",
      "fontSizeMd": "1rem",
      "fontSizeLg": "1.25rem",
      "fontSizeXl": "2.25rem",
      "lineHeightBody": "1.5",
      "lineHeightHeading": "1.05",
      "fontWeightNormal": "400",
      "fontWeightMedium": "600",
      "fontWeightBold": "750"
    },
    "radius": {
      "radiusSm": "0",
      "radiusMd": "0",
      "radiusLg": "0",
      "radiusFull": "0"
    },
    "shadow": {
      "shadowSm": "3px 3px 0 #000000",
      "shadowMd": "5px 5px 0 #000000",
      "shadowLg": "8px 8px 0 #000000"
    },
    "spacing": {
      "spaceXs": "0.25rem",
      "spaceSm": "0.5rem",
      "spaceMd": "1rem",
      "spaceLg": "1.5rem",
      "spaceXl": "2.25rem",
      "space2xl": "4rem",
      "space2xlXs": "2.5rem"
    },
    "layout": {
      "contentWidth": "72ch",
      "wideWidth": "1120px",
      "bodyPadding": "1.25rem",
      "sectionSpacing": "3rem",
      "headerWidth": "1120px",
      "footerWidth": "1120px",
      "bodyPaddingSm": "1rem",
      "bodyPaddingXs": "0.8rem",
      "sectionSpacingSm": "2rem"
    },
    "scroll": {
      "scrollbarWidth": "auto",
      "scrollbarSize": "12px",
      "scrollbarTrack": "var(--color-surface)",
      "scrollbarThumb": "var(--color-border)",
      "scrollbarThumbHover": "var(--color-text-muted)",
      "scrollbarRadius": "var(--radius-full)",
      "scrollbarGutter": "auto",
      "scrollBehavior": "auto",
      "scrollPaddingTop": "0",
      "overscrollBehavior": "auto"
    }
  },
  "modes": {
    "light": {
      "colors": {}
    },
    "dark": {
      "colors": {
        "background": "#0a0a0a",
        "surface": "#141414",
        "surfaceAlt": "#3a3405",
        "text": "#f5f5f5",
        "textMuted": "#b5b5b5",
        "primary": "#7a86ff",
        "primaryHover": "#9aa3ff",
        "primaryText": "#060614",
        "border": "#f5f5f5",
        "codeBackground": "#000000",
        "codeText": "#f5f5f5"
      }
    }
  },
  "layers": {
    "base": {
      "html": {
        "colorScheme": "light dark",
        "background": "var(--color-background)"
      },
      "h1, h2, h3, h4, h5, h6": {
        "fontFamily": "var(--font-heading)",
        "fontWeight": "var(--font-weight-bold)",
        "lineHeight": "var(--line-height-heading)",
        "marginBlock": "1.25em 0.5em"
      },
      "p, ul, ol, dl, blockquote, pre, figure, table, form, details": {
        "marginBlock": "0 var(--space-lg)"
      },
      "th, td": {
        "padding": "var(--space-sm) var(--space-md)",
        "verticalAlign": "top"
      },
      "label": {
        "display": "block",
        "marginBlock": "var(--space-sm)"
      },
      "input:not([type=\"checkbox\"]):not([type=\"radio\"]), textarea, select": {
        "width": "100%"
      },
      "input, textarea, select, button": {
        "background": "var(--color-surface)",
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-sm)",
        "color": "var(--color-text)",
        "font": "inherit",
        "padding": "0.65rem 0.8rem"
      },
      "button": {
        "background": "var(--color-primary)",
        "color": "var(--color-primary-text)"
      }
    },
    "elements": {
      "pre code": {
        "background": "transparent",
        "color": "inherit",
        "padding": "0"
      },
      "body": {
        "margin": "0",
        "backgroundColor": "var(--color-background)",
        "color": "var(--color-text)",
        "fontFamily": "var(--font-body)",
        "fontSize": "var(--font-size-base)",
        "lineHeight": "var(--line-height-body)"
      },
      "header": {
        "maxWidth": "var(--header-width)",
        "marginInline": "auto",
        "padding": "var(--space-lg) var(--body-padding)"
      },
      "nav": {
        "display": "flex",
        "gap": "var(--space-md)",
        "alignItems": "center",
        "flexWrap": "wrap"
      },
      "main": {
        "maxWidth": "var(--content-width)",
        "marginInline": "auto",
        "padding": "var(--space-lg) var(--body-padding) var(--space-2xl)"
      },
      "section": {
        "marginBlock": "var(--section-spacing)"
      },
      "article": {
        "backgroundColor": "var(--color-background)",
        "border": "3px solid var(--color-border)",
        "borderRadius": "0",
        "padding": "var(--space-lg)",
        "boxShadow": "var(--shadow-md)"
      },
      "aside": {
        "borderInlineStart": "4px solid var(--color-primary)",
        "backgroundColor": "var(--color-surface)",
        "padding": "var(--space-md)"
      },
      "footer": {
        "maxWidth": "var(--footer-width)",
        "marginInline": "auto",
        "padding": "var(--space-xl) var(--body-padding)",
        "color": "var(--color-text-muted)",
        "borderTop": "1px solid var(--color-border)"
      },
      "h1": {
        "fontSize": "clamp(2.5rem, 8vw, 5rem)",
        "textTransform": "uppercase",
        "letterSpacing": "-0.01em"
      },
      "h2": {
        "fontSize": "clamp(1.7rem, 5vw, 2.6rem)",
        "textTransform": "uppercase",
        "letterSpacing": "0.01em",
        "borderBottom": "3px solid var(--color-border)",
        "paddingBottom": "0.25em"
      },
      "h3": {
        "fontSize": "1.5rem"
      },
      "h4": {
        "fontSize": "1.25rem"
      },
      "h5": {
        "fontSize": "1.05rem"
      },
      "h6": {
        "fontSize": "0.95rem",
        "textTransform": "uppercase",
        "letterSpacing": "0.08em"
      },
      "a": {
        "color": "var(--color-primary)",
        "textUnderlineOffset": "0.2em",
        "textDecoration": "underline",
        "textDecorationThickness": "2px"
      },
      "mark": {
        "backgroundColor": "color-mix(in srgb, var(--color-warning) 25%, transparent)",
        "color": "inherit"
      },
      "blockquote": {
        "marginInline": "0",
        "padding": "var(--space-md) var(--space-lg)",
        "borderInlineStart": "6px solid var(--color-border)",
        "color": "var(--color-text)",
        "backgroundColor": "var(--color-surface-alt)",
        "fontStyle": "normal"
      },
      "hr": {
        "border": "0",
        "borderTop": "1px solid var(--color-border)",
        "marginBlock": "var(--space-xl)"
      },
      "code": {
        "fontFamily": "var(--font-mono)",
        "backgroundColor": "var(--color-surface-alt)",
        "borderRadius": "0",
        "padding": "0.1em 0.35em",
        "border": "2px solid var(--color-border)"
      },
      "pre": {
        "backgroundColor": "var(--color-code-background)",
        "color": "var(--color-code-text)",
        "padding": "var(--space-lg)",
        "borderRadius": "var(--radius-md)",
        "overflowX": "auto"
      },
      "kbd": {
        "fontFamily": "var(--font-mono)",
        "border": "1px solid var(--color-border)",
        "borderBottomWidth": "3px",
        "borderRadius": "var(--radius-sm)",
        "padding": "0.12rem 0.4rem",
        "backgroundColor": "var(--color-surface)"
      },
      "table": {
        "width": "100%",
        "borderCollapse": "collapse",
        "marginBlock": "var(--space-lg)"
      },
      "th": {
        "textAlign": "left",
        "backgroundColor": "var(--color-text)",
        "color": "var(--color-background)"
      },
      "td": {
        "borderTop": "1px solid var(--color-border)"
      },
      "caption": {
        "color": "var(--color-text-muted)",
        "marginBottom": "var(--space-sm)",
        "textAlign": "left"
      },
      "fieldset": {
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-md)",
        "padding": "var(--space-lg)"
      },
      "input": {
        "boxSizing": "border-box",
        "border": "3px solid var(--color-border)",
        "borderRadius": "0"
      },
      "textarea": {
        "width": "100%",
        "boxSizing": "border-box",
        "minHeight": "7rem",
        "resize": "vertical"
      },
      "select": {
        "width": "100%",
        "boxSizing": "border-box"
      },
      "button": {
        "cursor": "pointer",
        "fontWeight": "var(--font-weight-medium)",
        "border": "3px solid var(--color-border)",
        "borderRadius": "0",
        "boxShadow": "var(--shadow-sm)",
        "textTransform": "uppercase"
      },
      "img": {
        "maxWidth": "100%",
        "height": "auto",
        "borderRadius": "0",
        "border": "3px solid var(--color-border)"
      },
      "figure": {
        "marginInline": "0"
      },
      "figcaption": {
        "color": "var(--color-text-muted)",
        "fontSize": "var(--font-size-sm)"
      },
      "details": {
        "border": "3px solid var(--color-border)",
        "borderRadius": "0",
        "padding": "var(--space-md)"
      },
      "summary": {
        "cursor": "pointer",
        "fontWeight": "var(--font-weight-medium)"
      }
    },
    "states": {
      "a:hover": {
        "color": "var(--color-primary-hover)"
      },
      "a:focus-visible": {
        "outline": "3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)",
        "outlineOffset": "3px"
      },
      "button:hover": {
        "backgroundColor": "var(--color-primary-hover)"
      },
      "button:focus-visible": {
        "outline": "3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)",
        "outlineOffset": "3px"
      },
      "button:active": {
        "transform": "translateY(1px)"
      },
      "button:disabled": {
        "opacity": "0.55",
        "cursor": "not-allowed"
      },
      "input:focus-visible": {
        "outline": "3px solid color-mix(in srgb, var(--color-primary) 35%, transparent)",
        "borderColor": "var(--color-primary)"
      },
      "input:disabled": {
        "opacity": "0.6",
        "cursor": "not-allowed"
      },
      "input:checked": {
        "accentColor": "var(--color-primary)"
      }
    },
    "responsive": {
      "tablet": {
        ":root": {
          "--body-padding": "var(--body-padding-sm)",
          "--section-spacing": "var(--section-spacing-sm)"
        },
        "table": {
          "fontSize": "var(--font-size-sm)"
        }
      },
      "mobile": {
        ":root": {
          "--body-padding": "var(--body-padding-xs)",
          "--space-2xl": "var(--space-2xl-xs)"
        },
        "h1": {
          "overflowWrap": "anywhere"
        }
      }
    }
  },
  "breakpoints": {
    "mobile": 390,
    "tablet": 768,
    "desktop": 1440
  },
  "options": {
    "includeMinimalReset": true,
    "reducedMotion": true
  }
} satisfies Theme

export const jornalPreset = {
  "schemaVersion": 2,
  "metadata": {
    "name": "Jornal",
    "description": "Newsprint paper, serif columns and double rules. Extra, extra!",
    "version": "1.0.0"
  },
  "tokens": {
    "colors": {
      "background": "#f7f3e8",
      "surface": "#fffdf6",
      "surfaceAlt": "#ece4d0",
      "text": "#1a1a1a",
      "textMuted": "#5a5148",
      "primary": "#8c1d1d",
      "primaryHover": "#6f1414",
      "primaryText": "#fff8f0",
      "secondary": "#4a5a6a",
      "border": "#d8cdb4",
      "success": "#4d7a3a",
      "warning": "#9c6b12",
      "danger": "#8c1d1d",
      "codeBackground": "#1a1a1a",
      "codeText": "#f2ecdc"
    },
    "typography": {
      "fontBody": "Georgia, \"Times New Roman\", serif",
      "fontHeading": "\"Times New Roman\", Times, Georgia, serif",
      "fontMono": "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
      "fontSizeBase": "18px",
      "fontSizeXs": "0.75rem",
      "fontSizeSm": "0.875rem",
      "fontSizeMd": "1rem",
      "fontSizeLg": "1.25rem",
      "fontSizeXl": "2.25rem",
      "lineHeightBody": "1.7",
      "lineHeightHeading": "1.05",
      "fontWeightNormal": "400",
      "fontWeightMedium": "600",
      "fontWeightBold": "750"
    },
    "radius": {
      "radiusSm": "0",
      "radiusMd": "0",
      "radiusLg": "0",
      "radiusFull": "999px"
    },
    "shadow": {
      "shadowSm": "none",
      "shadowMd": "none",
      "shadowLg": "none"
    },
    "spacing": {
      "spaceXs": "0.25rem",
      "spaceSm": "0.5rem",
      "spaceMd": "1rem",
      "spaceLg": "1.5rem",
      "spaceXl": "2.25rem",
      "space2xl": "4rem",
      "space2xlXs": "2.5rem"
    },
    "layout": {
      "contentWidth": "66ch",
      "wideWidth": "1120px",
      "bodyPadding": "1.25rem",
      "sectionSpacing": "3rem",
      "headerWidth": "1120px",
      "footerWidth": "1120px",
      "bodyPaddingSm": "1rem",
      "bodyPaddingXs": "0.8rem",
      "sectionSpacingSm": "2rem"
    },
    "scroll": {
      "scrollbarWidth": "auto",
      "scrollbarSize": "12px",
      "scrollbarTrack": "var(--color-surface)",
      "scrollbarThumb": "var(--color-border)",
      "scrollbarThumbHover": "var(--color-text-muted)",
      "scrollbarRadius": "var(--radius-full)",
      "scrollbarGutter": "auto",
      "scrollBehavior": "auto",
      "scrollPaddingTop": "0",
      "overscrollBehavior": "auto"
    }
  },
  "modes": {
    "light": {
      "colors": {}
    },
    "dark": {
      "colors": {
        "background": "#141210",
        "surface": "#1d1a15",
        "surfaceAlt": "#282219",
        "text": "#ece5d8",
        "textMuted": "#a89c86",
        "primary": "#d9b36a",
        "primaryHover": "#e8c987",
        "primaryText": "#1a1409",
        "border": "#38312a",
        "codeBackground": "#0d0b09",
        "codeText": "#ece5d8"
      }
    }
  },
  "layers": {
    "base": {
      "html": {
        "colorScheme": "light dark",
        "background": "var(--color-background)"
      },
      "h1, h2, h3, h4, h5, h6": {
        "fontFamily": "var(--font-heading)",
        "fontWeight": "var(--font-weight-bold)",
        "lineHeight": "var(--line-height-heading)",
        "marginBlock": "1.25em 0.5em"
      },
      "p, ul, ol, dl, blockquote, pre, figure, table, form, details": {
        "marginBlock": "0 var(--space-lg)"
      },
      "th, td": {
        "padding": "var(--space-sm) var(--space-md)",
        "verticalAlign": "top"
      },
      "label": {
        "display": "block",
        "marginBlock": "var(--space-sm)"
      },
      "input:not([type=\"checkbox\"]):not([type=\"radio\"]), textarea, select": {
        "width": "100%"
      },
      "input, textarea, select, button": {
        "background": "var(--color-surface)",
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-sm)",
        "color": "var(--color-text)",
        "font": "inherit",
        "padding": "0.65rem 0.8rem"
      },
      "button": {
        "background": "var(--color-primary)",
        "color": "var(--color-primary-text)"
      }
    },
    "elements": {
      "pre code": {
        "background": "transparent",
        "color": "inherit",
        "padding": "0"
      },
      "body": {
        "margin": "0",
        "backgroundColor": "var(--color-background)",
        "color": "var(--color-text)",
        "fontFamily": "var(--font-body)",
        "fontSize": "var(--font-size-base)",
        "lineHeight": "var(--line-height-body)"
      },
      "header": {
        "maxWidth": "var(--header-width)",
        "marginInline": "auto",
        "padding": "var(--space-lg) var(--body-padding)"
      },
      "nav": {
        "display": "flex",
        "gap": "var(--space-md)",
        "alignItems": "center",
        "flexWrap": "wrap"
      },
      "main": {
        "maxWidth": "var(--content-width)",
        "marginInline": "auto",
        "padding": "var(--space-lg) var(--body-padding) var(--space-2xl)"
      },
      "section": {
        "marginBlock": "var(--section-spacing)"
      },
      "article": {
        "backgroundColor": "transparent",
        "border": "0",
        "padding": "0",
        "boxShadow": "none"
      },
      "aside": {
        "borderInlineStart": "4px solid var(--color-primary)",
        "backgroundColor": "var(--color-surface)",
        "padding": "var(--space-md)"
      },
      "footer": {
        "maxWidth": "var(--footer-width)",
        "marginInline": "auto",
        "padding": "var(--space-xl) var(--body-padding)",
        "color": "var(--color-text-muted)",
        "borderTop": "1px solid var(--color-border)"
      },
      "h1": {
        "fontSize": "clamp(2.6rem, 7vw, 5rem)",
        "letterSpacing": "-0.01em",
        "textAlign": "center"
      },
      "h2": {
        "fontSize": "clamp(2rem, 5vw, 3.4rem)",
        "letterSpacing": "0.06em",
        "textTransform": "uppercase",
        "borderBottom": "3px double var(--color-border)",
        "paddingBottom": "0.3em"
      },
      "h3": {
        "fontSize": "1.5rem"
      },
      "h4": {
        "fontSize": "1.25rem"
      },
      "h5": {
        "fontSize": "1.05rem"
      },
      "h6": {
        "fontSize": "0.95rem",
        "textTransform": "uppercase",
        "letterSpacing": "0.08em"
      },
      "a": {
        "color": "var(--color-primary)",
        "textUnderlineOffset": "0.2em"
      },
      "mark": {
        "backgroundColor": "color-mix(in srgb, var(--color-warning) 25%, transparent)",
        "color": "inherit"
      },
      "blockquote": {
        "fontSize": "1.25em",
        "fontStyle": "italic",
        "borderInlineStart": "0",
        "borderBlock": "1px solid var(--color-border)",
        "padding": "var(--space-lg) var(--space-md)",
        "textAlign": "center",
        "borderTop": "1px solid var(--color-border)",
        "borderBottom": "1px solid var(--color-border)"
      },
      "hr": {
        "border": "0",
        "borderTop": "1px solid var(--color-border)",
        "marginBlock": "var(--space-xl)"
      },
      "code": {
        "fontFamily": "var(--font-mono)",
        "backgroundColor": "var(--color-surface-alt)",
        "borderRadius": "var(--radius-sm)",
        "padding": "0.1em 0.35em"
      },
      "pre": {
        "backgroundColor": "var(--color-code-background)",
        "color": "var(--color-code-text)",
        "padding": "var(--space-lg)",
        "borderRadius": "var(--radius-md)",
        "overflowX": "auto"
      },
      "kbd": {
        "fontFamily": "var(--font-mono)",
        "border": "1px solid var(--color-border)",
        "borderBottomWidth": "3px",
        "borderRadius": "var(--radius-sm)",
        "padding": "0.12rem 0.4rem",
        "backgroundColor": "var(--color-surface)"
      },
      "table": {
        "width": "100%",
        "borderCollapse": "collapse",
        "marginBlock": "var(--space-lg)"
      },
      "th": {
        "textAlign": "left",
        "backgroundColor": "var(--color-surface)",
        "textTransform": "uppercase",
        "letterSpacing": "0.05em",
        "fontSize": "var(--font-size-sm)"
      },
      "td": {
        "borderTop": "1px solid var(--color-border)"
      },
      "caption": {
        "color": "var(--color-text-muted)",
        "marginBottom": "var(--space-sm)",
        "textAlign": "left"
      },
      "fieldset": {
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-md)",
        "padding": "var(--space-lg)"
      },
      "input": {
        "boxSizing": "border-box"
      },
      "textarea": {
        "width": "100%",
        "boxSizing": "border-box",
        "minHeight": "7rem",
        "resize": "vertical"
      },
      "select": {
        "width": "100%",
        "boxSizing": "border-box"
      },
      "button": {
        "cursor": "pointer",
        "fontWeight": "var(--font-weight-medium)"
      },
      "img": {
        "maxWidth": "100%",
        "height": "auto",
        "borderRadius": "var(--radius-md)"
      },
      "figure": {
        "marginInline": "0"
      },
      "figcaption": {
        "color": "var(--color-text-muted)",
        "fontSize": "var(--font-size-sm)",
        "fontStyle": "italic"
      },
      "details": {
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-md)",
        "padding": "var(--space-md)"
      },
      "summary": {
        "cursor": "pointer",
        "fontWeight": "var(--font-weight-medium)"
      }
    },
    "states": {
      "a:hover": {
        "color": "var(--color-primary-hover)"
      },
      "a:focus-visible": {
        "outline": "3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)",
        "outlineOffset": "3px"
      },
      "button:hover": {
        "backgroundColor": "var(--color-primary-hover)"
      },
      "button:focus-visible": {
        "outline": "3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)",
        "outlineOffset": "3px"
      },
      "button:active": {
        "transform": "translateY(1px)"
      },
      "button:disabled": {
        "opacity": "0.55",
        "cursor": "not-allowed"
      },
      "input:focus-visible": {
        "outline": "3px solid color-mix(in srgb, var(--color-primary) 35%, transparent)",
        "borderColor": "var(--color-primary)"
      },
      "input:disabled": {
        "opacity": "0.6",
        "cursor": "not-allowed"
      },
      "input:checked": {
        "accentColor": "var(--color-primary)"
      }
    },
    "responsive": {
      "tablet": {
        ":root": {
          "--body-padding": "var(--body-padding-sm)",
          "--section-spacing": "var(--section-spacing-sm)"
        },
        "table": {
          "fontSize": "var(--font-size-sm)"
        }
      },
      "mobile": {
        ":root": {
          "--body-padding": "var(--body-padding-xs)",
          "--space-2xl": "var(--space-2xl-xs)"
        },
        "h1": {
          "overflowWrap": "anywhere"
        }
      }
    }
  },
  "breakpoints": {
    "mobile": 390,
    "tablet": 768,
    "desktop": 1440
  },
  "options": {
    "includeMinimalReset": true,
    "reducedMotion": true
  }
} satisfies Theme

export const algodaoDocePreset = {
  "schemaVersion": 2,
  "metadata": {
    "name": "Algodão-doce",
    "description": "Candy pinks and baby blues with pill shapes for a sweet, soft read.",
    "version": "1.0.0"
  },
  "tokens": {
    "colors": {
      "background": "#fff7fb",
      "surface": "#ffeef6",
      "surfaceAlt": "#e0f0fc",
      "text": "#4a2b3f",
      "textMuted": "#75536a",
      "primary": "#c2256a",
      "primaryHover": "#a31d57",
      "primaryText": "#ffffff",
      "secondary": "#2b8fd4",
      "border": "#f2c9dd",
      "success": "#4d9a5b",
      "warning": "#b07d10",
      "danger": "#c2256a",
      "codeBackground": "#4a2b3f",
      "codeText": "#ffe9f3"
    },
    "typography": {
      "fontBody": "ui-rounded, \"SF Pro Rounded\", Inter, system-ui, sans-serif",
      "fontHeading": "ui-rounded, \"SF Pro Rounded\", Inter, system-ui, sans-serif",
      "fontMono": "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
      "fontSizeBase": "16px",
      "fontSizeXs": "0.75rem",
      "fontSizeSm": "0.875rem",
      "fontSizeMd": "1rem",
      "fontSizeLg": "1.25rem",
      "fontSizeXl": "2.25rem",
      "lineHeightBody": "1.7",
      "lineHeightHeading": "1.15",
      "fontWeightNormal": "400",
      "fontWeightMedium": "600",
      "fontWeightBold": "750"
    },
    "radius": {
      "radiusSm": "0.5rem",
      "radiusMd": "1rem",
      "radiusLg": "1.75rem",
      "radiusFull": "999px"
    },
    "shadow": {
      "shadowSm": "0 1px 2px rgb(200 60 130 / 0.12)",
      "shadowMd": "0 10px 28px rgb(200 60 130 / 0.15)",
      "shadowLg": "0 24px 55px rgb(200 60 130 / 0.20)"
    },
    "spacing": {
      "spaceXs": "0.25rem",
      "spaceSm": "0.5rem",
      "spaceMd": "1rem",
      "spaceLg": "1.5rem",
      "spaceXl": "2.25rem",
      "space2xl": "4rem",
      "space2xlXs": "2.5rem"
    },
    "layout": {
      "contentWidth": "72ch",
      "wideWidth": "1120px",
      "bodyPadding": "1.25rem",
      "sectionSpacing": "3rem",
      "headerWidth": "1120px",
      "footerWidth": "1120px",
      "bodyPaddingSm": "1rem",
      "bodyPaddingXs": "0.8rem",
      "sectionSpacingSm": "2rem"
    },
    "scroll": {
      "scrollbarWidth": "auto",
      "scrollbarSize": "12px",
      "scrollbarTrack": "var(--color-surface)",
      "scrollbarThumb": "var(--color-border)",
      "scrollbarThumbHover": "var(--color-text-muted)",
      "scrollbarRadius": "var(--radius-full)",
      "scrollbarGutter": "auto",
      "scrollBehavior": "auto",
      "scrollPaddingTop": "0",
      "overscrollBehavior": "auto"
    }
  },
  "modes": {
    "light": {
      "colors": {}
    },
    "dark": {
      "colors": {
        "background": "#201219",
        "surface": "#2c1824",
        "surfaceAlt": "#3a2230",
        "text": "#f9e6ef",
        "textMuted": "#c49ab2",
        "primary": "#ff8fc0",
        "primaryHover": "#ffaed3",
        "primaryText": "#3a0a20",
        "border": "#4e2c40",
        "codeBackground": "#12080e",
        "codeText": "#ffd9e8"
      }
    }
  },
  "layers": {
    "base": {
      "html": {
        "colorScheme": "light dark",
        "background": "var(--color-background)"
      },
      "h1, h2, h3, h4, h5, h6": {
        "fontFamily": "var(--font-heading)",
        "fontWeight": "var(--font-weight-bold)",
        "lineHeight": "var(--line-height-heading)",
        "marginBlock": "1.25em 0.5em"
      },
      "p, ul, ol, dl, blockquote, pre, figure, table, form, details": {
        "marginBlock": "0 var(--space-lg)"
      },
      "th, td": {
        "padding": "var(--space-sm) var(--space-md)",
        "verticalAlign": "top"
      },
      "label": {
        "display": "block",
        "marginBlock": "var(--space-sm)"
      },
      "input:not([type=\"checkbox\"]):not([type=\"radio\"]), textarea, select": {
        "width": "100%"
      },
      "input, textarea, select, button": {
        "background": "var(--color-surface)",
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-sm)",
        "color": "var(--color-text)",
        "font": "inherit",
        "padding": "0.65rem 0.8rem"
      },
      "button": {
        "background": "var(--color-primary)",
        "color": "var(--color-primary-text)"
      }
    },
    "elements": {
      "pre code": {
        "background": "transparent",
        "color": "inherit",
        "padding": "0"
      },
      "body": {
        "margin": "0",
        "backgroundColor": "var(--color-background)",
        "color": "var(--color-text)",
        "fontFamily": "var(--font-body)",
        "fontSize": "var(--font-size-base)",
        "lineHeight": "var(--line-height-body)"
      },
      "header": {
        "maxWidth": "var(--header-width)",
        "marginInline": "auto",
        "padding": "var(--space-lg) var(--body-padding)"
      },
      "nav": {
        "display": "flex",
        "gap": "var(--space-md)",
        "alignItems": "center",
        "flexWrap": "wrap"
      },
      "main": {
        "maxWidth": "var(--content-width)",
        "marginInline": "auto",
        "padding": "var(--space-lg) var(--body-padding) var(--space-2xl)"
      },
      "section": {
        "marginBlock": "var(--section-spacing)"
      },
      "article": {
        "backgroundColor": "var(--color-surface)",
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-lg)",
        "padding": "var(--space-lg)",
        "boxShadow": "var(--shadow-md)"
      },
      "aside": {
        "borderInlineStart": "4px solid var(--color-primary)",
        "backgroundColor": "var(--color-surface)",
        "padding": "var(--space-md)"
      },
      "footer": {
        "maxWidth": "var(--footer-width)",
        "marginInline": "auto",
        "padding": "var(--space-xl) var(--body-padding)",
        "color": "var(--color-text-muted)",
        "borderTop": "1px solid var(--color-border)"
      },
      "h1": {
        "fontSize": "clamp(2.2rem, 7vw, 4.25rem)",
        "letterSpacing": "-0.02em"
      },
      "h2": {
        "fontSize": "clamp(1.7rem, 5vw, 2.6rem)"
      },
      "h3": {
        "fontSize": "1.5rem"
      },
      "h4": {
        "fontSize": "1.25rem"
      },
      "h5": {
        "fontSize": "1.05rem"
      },
      "h6": {
        "fontSize": "0.95rem",
        "textTransform": "uppercase",
        "letterSpacing": "0.08em"
      },
      "a": {
        "color": "var(--color-primary)",
        "textUnderlineOffset": "0.2em"
      },
      "mark": {
        "backgroundColor": "color-mix(in srgb, var(--color-warning) 25%, transparent)",
        "color": "inherit"
      },
      "blockquote": {
        "marginInline": "0",
        "padding": "var(--space-md) var(--space-lg)",
        "borderInlineStart": "4px solid var(--color-primary)",
        "color": "var(--color-text-muted)",
        "borderRadius": "0 var(--radius-lg) var(--radius-lg) 0"
      },
      "hr": {
        "border": "0",
        "borderTop": "1px solid var(--color-border)",
        "marginBlock": "var(--space-xl)"
      },
      "code": {
        "fontFamily": "var(--font-mono)",
        "backgroundColor": "var(--color-surface-alt)",
        "borderRadius": "var(--radius-sm)",
        "padding": "0.1em 0.35em"
      },
      "pre": {
        "backgroundColor": "var(--color-code-background)",
        "color": "var(--color-code-text)",
        "padding": "var(--space-lg)",
        "borderRadius": "var(--radius-md)",
        "overflowX": "auto"
      },
      "kbd": {
        "fontFamily": "var(--font-mono)",
        "border": "1px solid var(--color-border)",
        "borderBottomWidth": "3px",
        "borderRadius": "var(--radius-sm)",
        "padding": "0.12rem 0.4rem",
        "backgroundColor": "var(--color-surface)"
      },
      "table": {
        "width": "100%",
        "borderCollapse": "collapse",
        "marginBlock": "var(--space-lg)"
      },
      "th": {
        "textAlign": "left",
        "backgroundColor": "var(--color-surface)"
      },
      "td": {
        "borderTop": "1px solid var(--color-border)"
      },
      "caption": {
        "color": "var(--color-text-muted)",
        "marginBottom": "var(--space-sm)",
        "textAlign": "left"
      },
      "fieldset": {
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-md)",
        "padding": "var(--space-lg)"
      },
      "input": {
        "boxSizing": "border-box"
      },
      "textarea": {
        "width": "100%",
        "boxSizing": "border-box",
        "minHeight": "7rem",
        "resize": "vertical"
      },
      "select": {
        "width": "100%",
        "boxSizing": "border-box"
      },
      "button": {
        "cursor": "pointer",
        "fontWeight": "var(--font-weight-medium)",
        "borderRadius": "var(--radius-full)",
        "padding": "0.7rem 1.4rem"
      },
      "img": {
        "maxWidth": "100%",
        "height": "auto",
        "borderRadius": "var(--radius-md)"
      },
      "figure": {
        "marginInline": "0"
      },
      "figcaption": {
        "color": "var(--color-text-muted)",
        "fontSize": "var(--font-size-sm)"
      },
      "details": {
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-lg)",
        "padding": "var(--space-md)"
      },
      "summary": {
        "cursor": "pointer",
        "fontWeight": "var(--font-weight-medium)"
      }
    },
    "states": {
      "a:hover": {
        "color": "var(--color-primary-hover)"
      },
      "a:focus-visible": {
        "outline": "3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)",
        "outlineOffset": "3px"
      },
      "button:hover": {
        "backgroundColor": "var(--color-primary-hover)"
      },
      "button:focus-visible": {
        "outline": "3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)",
        "outlineOffset": "3px"
      },
      "button:active": {
        "transform": "translateY(1px)"
      },
      "button:disabled": {
        "opacity": "0.55",
        "cursor": "not-allowed"
      },
      "input:focus-visible": {
        "outline": "3px solid color-mix(in srgb, var(--color-primary) 35%, transparent)",
        "borderColor": "var(--color-primary)"
      },
      "input:disabled": {
        "opacity": "0.6",
        "cursor": "not-allowed"
      },
      "input:checked": {
        "accentColor": "var(--color-primary)"
      }
    },
    "responsive": {
      "tablet": {
        ":root": {
          "--body-padding": "var(--body-padding-sm)",
          "--section-spacing": "var(--section-spacing-sm)"
        },
        "table": {
          "fontSize": "var(--font-size-sm)"
        }
      },
      "mobile": {
        ":root": {
          "--body-padding": "var(--body-padding-xs)",
          "--space-2xl": "var(--space-2xl-xs)"
        },
        "h1": {
          "overflowWrap": "anywhere"
        }
      }
    }
  },
  "breakpoints": {
    "mobile": 390,
    "tablet": 768,
    "desktop": 1440
  },
  "options": {
    "includeMinimalReset": true,
    "reducedMotion": true
  }
} satisfies Theme

export const corporativoPreset = {
  "schemaVersion": 2,
  "metadata": {
    "name": "Corporativo",
    "description": "Crisp slate and corporate blue with sharp cards for business docs.",
    "version": "1.0.0"
  },
  "tokens": {
    "colors": {
      "background": "#ffffff",
      "surface": "#f1f5f9",
      "surfaceAlt": "#e2e8f0",
      "text": "#0f172a",
      "textMuted": "#475569",
      "primary": "#2563eb",
      "primaryHover": "#1d4ed8",
      "primaryText": "#ffffff",
      "secondary": "#0ea5e9",
      "border": "#cbd5e1",
      "success": "#15803d",
      "warning": "#b45309",
      "danger": "#dc2626",
      "codeBackground": "#0f172a",
      "codeText": "#e2e8f0"
    },
    "typography": {
      "fontBody": "Inter, ui-sans-serif, system-ui, sans-serif",
      "fontHeading": "Inter, ui-sans-serif, system-ui, sans-serif",
      "fontMono": "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
      "fontSizeBase": "16px",
      "fontSizeXs": "0.75rem",
      "fontSizeSm": "0.875rem",
      "fontSizeMd": "1rem",
      "fontSizeLg": "1.25rem",
      "fontSizeXl": "2.25rem",
      "lineHeightBody": "1.65",
      "lineHeightHeading": "1.15",
      "fontWeightNormal": "400",
      "fontWeightMedium": "600",
      "fontWeightBold": "750"
    },
    "radius": {
      "radiusSm": "0.375rem",
      "radiusMd": "0.5rem",
      "radiusLg": "0.75rem",
      "radiusFull": "999px"
    },
    "shadow": {
      "shadowSm": "0 1px 2px rgb(15 23 42 / 0.08)",
      "shadowMd": "0 8px 24px rgb(15 23 42 / 0.10)",
      "shadowLg": "0 20px 50px rgb(15 23 42 / 0.14)"
    },
    "spacing": {
      "spaceXs": "0.25rem",
      "spaceSm": "0.5rem",
      "spaceMd": "1rem",
      "spaceLg": "1.5rem",
      "spaceXl": "2.25rem",
      "space2xl": "4rem",
      "space2xlXs": "2.5rem"
    },
    "layout": {
      "contentWidth": "72ch",
      "wideWidth": "1120px",
      "bodyPadding": "1.25rem",
      "sectionSpacing": "3rem",
      "headerWidth": "1120px",
      "footerWidth": "1120px",
      "bodyPaddingSm": "1rem",
      "bodyPaddingXs": "0.8rem",
      "sectionSpacingSm": "2rem"
    },
    "scroll": {
      "scrollbarWidth": "auto",
      "scrollbarSize": "12px",
      "scrollbarTrack": "var(--color-surface)",
      "scrollbarThumb": "var(--color-border)",
      "scrollbarThumbHover": "var(--color-text-muted)",
      "scrollbarRadius": "var(--radius-full)",
      "scrollbarGutter": "auto",
      "scrollBehavior": "auto",
      "scrollPaddingTop": "0",
      "overscrollBehavior": "auto"
    }
  },
  "modes": {
    "light": {
      "colors": {}
    },
    "dark": {
      "colors": {
        "background": "#0f1724",
        "surface": "#151f2e",
        "surfaceAlt": "#1d2a3b",
        "text": "#e8edf5",
        "textMuted": "#a5b1c2",
        "primary": "#78b7ff",
        "primaryHover": "#a5ceff",
        "primaryText": "#11162c",
        "border": "#2c3b50",
        "codeBackground": "#090d14",
        "codeText": "#e8edf5"
      }
    }
  },
  "layers": {
    "base": {
      "html": {
        "colorScheme": "light dark",
        "background": "var(--color-background)"
      },
      "h1, h2, h3, h4, h5, h6": {
        "fontFamily": "var(--font-heading)",
        "fontWeight": "var(--font-weight-bold)",
        "lineHeight": "var(--line-height-heading)",
        "marginBlock": "1.25em 0.5em"
      },
      "p, ul, ol, dl, blockquote, pre, figure, table, form, details": {
        "marginBlock": "0 var(--space-lg)"
      },
      "th, td": {
        "padding": "var(--space-sm) var(--space-md)",
        "verticalAlign": "top"
      },
      "label": {
        "display": "block",
        "marginBlock": "var(--space-sm)"
      },
      "input:not([type=\"checkbox\"]):not([type=\"radio\"]), textarea, select": {
        "width": "100%"
      },
      "input, textarea, select, button": {
        "background": "var(--color-surface)",
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-sm)",
        "color": "var(--color-text)",
        "font": "inherit",
        "padding": "0.65rem 0.8rem"
      },
      "button": {
        "background": "var(--color-primary)",
        "color": "var(--color-primary-text)"
      }
    },
    "elements": {
      "pre code": {
        "background": "transparent",
        "color": "inherit",
        "padding": "0"
      },
      "body": {
        "margin": "0",
        "backgroundColor": "var(--color-background)",
        "color": "var(--color-text)",
        "fontFamily": "var(--font-body)",
        "fontSize": "var(--font-size-base)",
        "lineHeight": "var(--line-height-body)"
      },
      "header": {
        "maxWidth": "var(--header-width)",
        "marginInline": "auto",
        "padding": "var(--space-lg) var(--body-padding)"
      },
      "nav": {
        "display": "flex",
        "gap": "var(--space-md)",
        "alignItems": "center",
        "flexWrap": "wrap"
      },
      "main": {
        "maxWidth": "var(--content-width)",
        "marginInline": "auto",
        "padding": "var(--space-lg) var(--body-padding) var(--space-2xl)"
      },
      "section": {
        "marginBlock": "var(--section-spacing)"
      },
      "article": {
        "backgroundColor": "var(--color-surface)",
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-lg)",
        "padding": "var(--space-lg)",
        "boxShadow": "var(--shadow-md)"
      },
      "aside": {
        "borderInlineStart": "4px solid var(--color-primary)",
        "backgroundColor": "var(--color-surface)",
        "padding": "var(--space-md)"
      },
      "footer": {
        "maxWidth": "var(--footer-width)",
        "marginInline": "auto",
        "padding": "var(--space-xl) var(--body-padding)",
        "color": "var(--color-text-muted)",
        "borderTop": "1px solid var(--color-border)"
      },
      "h1": {
        "fontSize": "clamp(2.2rem, 6vw, 3.8rem)",
        "letterSpacing": "-0.03em"
      },
      "h2": {
        "fontSize": "clamp(1.7rem, 5vw, 2.6rem)",
        "letterSpacing": "-0.02em",
        "borderBottom": "2px solid var(--color-primary)",
        "paddingBottom": "0.3em"
      },
      "h3": {
        "fontSize": "1.5rem"
      },
      "h4": {
        "fontSize": "1.25rem"
      },
      "h5": {
        "fontSize": "1.05rem"
      },
      "h6": {
        "fontSize": "0.95rem",
        "textTransform": "uppercase",
        "letterSpacing": "0.08em"
      },
      "a": {
        "color": "var(--color-primary)",
        "textUnderlineOffset": "0.2em"
      },
      "mark": {
        "backgroundColor": "color-mix(in srgb, var(--color-warning) 25%, transparent)",
        "color": "inherit"
      },
      "blockquote": {
        "marginInline": "0",
        "padding": "var(--space-md) var(--space-lg)",
        "borderInlineStart": "4px solid var(--color-primary)",
        "color": "var(--color-text-muted)"
      },
      "hr": {
        "border": "0",
        "borderTop": "1px solid var(--color-border)",
        "marginBlock": "var(--space-xl)"
      },
      "code": {
        "fontFamily": "var(--font-mono)",
        "backgroundColor": "var(--color-surface-alt)",
        "borderRadius": "var(--radius-sm)",
        "padding": "0.1em 0.35em"
      },
      "pre": {
        "backgroundColor": "var(--color-code-background)",
        "color": "var(--color-code-text)",
        "padding": "var(--space-lg)",
        "borderRadius": "var(--radius-md)",
        "overflowX": "auto"
      },
      "kbd": {
        "fontFamily": "var(--font-mono)",
        "border": "1px solid var(--color-border)",
        "borderBottomWidth": "3px",
        "borderRadius": "var(--radius-sm)",
        "padding": "0.12rem 0.4rem",
        "backgroundColor": "var(--color-surface)"
      },
      "table": {
        "width": "100%",
        "borderCollapse": "collapse",
        "marginBlock": "var(--space-lg)"
      },
      "th": {
        "textAlign": "left",
        "backgroundColor": "var(--color-primary)",
        "color": "var(--color-primary-text)"
      },
      "td": {
        "borderTop": "1px solid var(--color-border)"
      },
      "caption": {
        "color": "var(--color-text-muted)",
        "marginBottom": "var(--space-sm)",
        "textAlign": "left"
      },
      "fieldset": {
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-md)",
        "padding": "var(--space-lg)"
      },
      "input": {
        "boxSizing": "border-box"
      },
      "textarea": {
        "width": "100%",
        "boxSizing": "border-box",
        "minHeight": "7rem",
        "resize": "vertical"
      },
      "select": {
        "width": "100%",
        "boxSizing": "border-box"
      },
      "button": {
        "cursor": "pointer",
        "fontWeight": "var(--font-weight-medium)"
      },
      "img": {
        "maxWidth": "100%",
        "height": "auto",
        "borderRadius": "var(--radius-md)"
      },
      "figure": {
        "marginInline": "0"
      },
      "figcaption": {
        "color": "var(--color-text-muted)",
        "fontSize": "var(--font-size-sm)"
      },
      "details": {
        "border": "1px solid var(--color-border)",
        "borderRadius": "var(--radius-md)",
        "padding": "var(--space-md)"
      },
      "summary": {
        "cursor": "pointer",
        "fontWeight": "var(--font-weight-medium)"
      }
    },
    "states": {
      "a:hover": {
        "color": "var(--color-primary-hover)"
      },
      "a:focus-visible": {
        "outline": "3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)",
        "outlineOffset": "3px"
      },
      "button:hover": {
        "backgroundColor": "var(--color-primary-hover)"
      },
      "button:focus-visible": {
        "outline": "3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)",
        "outlineOffset": "3px"
      },
      "button:active": {
        "transform": "translateY(1px)"
      },
      "button:disabled": {
        "opacity": "0.55",
        "cursor": "not-allowed"
      },
      "input:focus-visible": {
        "outline": "3px solid color-mix(in srgb, var(--color-primary) 35%, transparent)",
        "borderColor": "var(--color-primary)"
      },
      "input:disabled": {
        "opacity": "0.6",
        "cursor": "not-allowed"
      },
      "input:checked": {
        "accentColor": "var(--color-primary)"
      }
    },
    "responsive": {
      "tablet": {
        ":root": {
          "--body-padding": "var(--body-padding-sm)",
          "--section-spacing": "var(--section-spacing-sm)"
        },
        "table": {
          "fontSize": "var(--font-size-sm)"
        }
      },
      "mobile": {
        ":root": {
          "--body-padding": "var(--body-padding-xs)",
          "--space-2xl": "var(--space-2xl-xs)"
        },
        "h1": {
          "overflowWrap": "anywhere"
        }
      }
    }
  },
  "breakpoints": {
    "mobile": 390,
    "tablet": 768,
    "desktop": 1440
  },
  "options": {
    "includeMinimalReset": true,
    "reducedMotion": true
  }
} satisfies Theme

export const maracujaPreset = {
  schemaVersion: 2,
  metadata: {
    name: 'Maracujá',
    description:
      'Passion-fruit purple over sun-washed cream with leaf-green accents.',
    version: '1.0.0',
  },
  tokens: {
    colors: {
      background: '#fbf7ee',
      surface: '#f4eddd',
      surfaceAlt: '#eae0c8',
      text: '#2f2337',
      textMuted: '#6f6280',
      primary: '#6d2380',
      primaryHover: '#551a65',
      primaryText: '#fcf7ef',
      secondary: '#57794f',
      border: '#ded2ba',
      success: '#3f7d4e',
      warning: '#b07d10',
      danger: '#c23a3a',
      codeBackground: '#2f2337',
      codeText: '#f6efe0',
    },
    typography: {
      fontBody: 'Inter, ui-sans-serif, system-ui, sans-serif',
      fontHeading: 'Playfair Display, Georgia, serif',
      fontMono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      fontSizeBase: '16px',
      fontSizeXs: '0.75rem',
      fontSizeSm: '0.875rem',
      fontSizeMd: '1rem',
      fontSizeLg: '1.25rem',
      fontSizeXl: '2.25rem',
      lineHeightBody: '1.7',
      lineHeightHeading: '1.1',
      fontWeightNormal: '400',
      fontWeightMedium: '600',
      fontWeightBold: '700',
    },
    radius: {
      radiusSm: '0.5rem',
      radiusMd: '0.9rem',
      radiusLg: '1.4rem',
      radiusFull: '999px',
    },
    shadow: {
      shadowSm: '0 1px 2px rgb(45 20 60 / 0.10)',
      shadowMd: '0 12px 32px rgb(45 20 60 / 0.14)',
      shadowLg: '0 24px 60px rgb(45 20 60 / 0.18)',
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
        background: '#191224',
        surface: '#221a30',
        surfaceAlt: '#2d2240',
        text: '#efe8f6',
        textMuted: '#a79ec2',
        primary: '#b57fd4',
        primaryHover: '#c99ce4',
        primaryText: '#241031',
        border: '#3a2d55',
        codeBackground: '#0e0917',
        codeText: '#f0e6fa',
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
        fontSize: 'clamp(2.4rem, 7vw, 4.4rem)',
        letterSpacing: '-0.03em',
      },
      h2: {
        fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
        letterSpacing: '-0.02em',
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
        borderInlineStart: '3px solid var(--color-primary)',
        color: 'var(--color-text)',
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontStyle: 'italic',
        fontSize: '1.15em',
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
  options: {
    includeMinimalReset: true,
    reducedMotion: true,
  },
  fonts: {
    heading: {
      family: 'Playfair Display',
      weights: [400, 600, 700],
      italic: true,
    },
  },
} satisfies Theme

export const pitayaPreset = {
  schemaVersion: 2,
  metadata: {
    name: 'Pitaya',
    description: 'Dragon-fruit magenta and scale-green on a neon-dark base.',
    version: '1.0.0',
  },
  tokens: {
    colors: {
      background: '#1a0b15',
      surface: '#251020',
      surfaceAlt: '#32182b',
      text: '#f7e9f1',
      textMuted: '#c3a4b8',
      primary: '#ea3f96',
      primaryHover: '#ff5cab',
      primaryText: '#2b0716',
      secondary: '#9a7f95',
      border: '#412136',
      success: '#9adb4f',
      warning: '#f2b544',
      danger: '#ff6b5e',
      codeBackground: '#120710',
      codeText: '#faecf5',
    },
    typography: {
      fontBody: 'Inter, ui-sans-serif, system-ui, sans-serif',
      fontHeading: 'Space Grotesk, Inter, ui-sans-serif, system-ui, sans-serif',
      fontMono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      fontSizeBase: '16px',
      fontSizeXs: '0.75rem',
      fontSizeSm: '0.875rem',
      fontSizeMd: '1rem',
      fontSizeLg: '1.25rem',
      fontSizeXl: '2.25rem',
      lineHeightBody: '1.65',
      lineHeightHeading: '1.05',
      fontWeightNormal: '400',
      fontWeightMedium: '600',
      fontWeightBold: '700',
    },
    radius: {
      radiusSm: '0.375rem',
      radiusMd: '0.75rem',
      radiusLg: '1.25rem',
      radiusFull: '999px',
    },
    shadow: {
      shadowSm: '0 1px 2px rgb(0 0 0 / 0.45)',
      shadowMd: '0 12px 32px rgb(234 63 150 / 0.22)',
      shadowLg: '0 24px 60px rgb(234 63 150 / 0.30)',
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
        background: '#12060f',
        surface: '#1b0c18',
        surfaceAlt: '#261223',
        border: '#361b2e',
        codeBackground: '#0a040a',
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
        fontSize: 'clamp(2.4rem, 7vw, 4.5rem)',
        letterSpacing: '-0.04em',
      },
      h2: {
        fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
        letterSpacing: '-0.03em',
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
  options: {
    includeMinimalReset: true,
    reducedMotion: true,
  },
  fonts: {
    heading: {
      family: 'Space Grotesk',
      weights: [400, 600, 700],
    },
  },
} satisfies Theme

export const goiabaPreset = {
  schemaVersion: 2,
  metadata: {
    name: 'Goiaba',
    description:
      'Guava-blush pink and leaf green with soft serifs for a homemade feel.',
    version: '1.0.0',
  },
  tokens: {
    colors: {
      background: '#fdf7f3',
      surface: '#f7ebe5',
      surfaceAlt: '#f0dcd3',
      text: '#40252b',
      textMuted: '#8a6a70',
      primary: '#d34f6f',
      primaryHover: '#b83a58',
      primaryText: '#fff6f2',
      secondary: '#6f8a5c',
      border: '#ecd6cc',
      success: '#4c7c4a',
      warning: '#b07a1e',
      danger: '#c23c3c',
      codeBackground: '#40252b',
      codeText: '#f9efe8',
    },
    typography: {
      fontBody: 'Lora, Georgia, serif',
      fontHeading: 'Lora, Georgia, serif',
      fontMono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      fontSizeBase: '17px',
      fontSizeXs: '0.75rem',
      fontSizeSm: '0.875rem',
      fontSizeMd: '1rem',
      fontSizeLg: '1.25rem',
      fontSizeXl: '2.25rem',
      lineHeightBody: '1.75',
      lineHeightHeading: '1.15',
      fontWeightNormal: '400',
      fontWeightMedium: '600',
      fontWeightBold: '700',
    },
    radius: {
      radiusSm: '0.5rem',
      radiusMd: '1rem',
      radiusLg: '1.5rem',
      radiusFull: '999px',
    },
    shadow: {
      shadowSm: '0 1px 2px rgb(120 40 60 / 0.08)',
      shadowMd: '0 12px 32px rgb(120 40 60 / 0.12)',
      shadowLg: '0 24px 60px rgb(120 40 60 / 0.16)',
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
      contentWidth: '70ch',
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
        background: '#241419',
        surface: '#2f1c22',
        surfaceAlt: '#3b242c',
        text: '#f5e9e6',
        textMuted: '#c0a3a8',
        primary: '#e8879f',
        primaryHover: '#f2a2b6',
        primaryText: '#33101a',
        border: '#4a3038',
        codeBackground: '#150a0e',
        codeText: '#f9ece8',
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
        fontSize: 'clamp(2.3rem, 7vw, 4.2rem)',
        letterSpacing: '-0.02em',
      },
      h2: {
        fontSize: 'clamp(1.7rem, 5vw, 2.6rem)',
        letterSpacing: '-0.015em',
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
        color: 'var(--color-text)',
        fontStyle: 'italic',
        fontSize: '1.15em',
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
        borderRadius: 'var(--radius-full)',
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
  options: {
    includeMinimalReset: true,
    reducedMotion: true,
  },
  fonts: {
    body: {
      family: 'Lora',
      weights: [400, 600, 700],
      italic: true,
    },
    heading: {
      family: 'Lora',
      weights: [400, 600, 700],
      italic: true,
    },
  },
} satisfies Theme

export const mangaPreset = {
  schemaVersion: 2,
  metadata: {
    name: 'Manga',
    description:
      'Ripe mango amber with pill buttons and chunky, juicy headings.',
    version: '1.0.0',
  },
  tokens: {
    colors: {
      background: '#fffdf4',
      surface: '#fdf2d9',
      surfaceAlt: '#f8e6b8',
      text: '#3a2c12',
      textMuted: '#7d6a42',
      primary: '#e07a00',
      primaryHover: '#b96300',
      primaryText: '#fff8ea',
      secondary: '#7f8a3a',
      border: '#eeda9c',
      success: '#57813a',
      warning: '#a86e12',
      danger: '#c43e2f',
      codeBackground: '#33260d',
      codeText: '#f8efdb',
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
      lineHeightBody: '1.6',
      lineHeightHeading: '1.05',
      fontWeightNormal: '400',
      fontWeightMedium: '600',
      fontWeightBold: '750',
    },
    radius: {
      radiusSm: '0.5rem',
      radiusMd: '0.75rem',
      radiusLg: '1.25rem',
      radiusFull: '999px',
    },
    shadow: {
      shadowSm: '0 1px 2px rgb(90 60 0 / 0.10)',
      shadowMd: '0 12px 32px rgb(224 122 0 / 0.16)',
      shadowLg: '0 24px 60px rgb(224 122 0 / 0.22)',
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
        background: '#1c1408',
        surface: '#271c0c',
        surfaceAlt: '#33260f',
        text: '#f5ecd8',
        textMuted: '#bfa87e',
        primary: '#f5a623',
        primaryHover: '#ffc14d',
        primaryText: '#2a1a03',
        border: '#40331a',
        codeBackground: '#120d05',
        codeText: '#f6eed9',
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
        fontSize: 'clamp(2.5rem, 8vw, 4.6rem)',
        letterSpacing: '-0.035em',
      },
      h2: {
        fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
        letterSpacing: '-0.025em',
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
        color: 'var(--color-text)',
        fontWeight: 'var(--font-weight-medium)',
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
        borderRadius: 'var(--radius-full)',
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
  options: {
    includeMinimalReset: true,
    reducedMotion: true,
  },
} satisfies Theme

export const pauBrasilPreset = {
  schemaVersion: 2,
  metadata: {
    name: 'Pau-brasil',
    description:
      'Brazilwood red on aged paper with didone headlines. Heritage print.',
    version: '1.0.0',
  },
  tokens: {
    colors: {
      background: '#faf6ee',
      surface: '#f2ead9',
      surfaceAlt: '#e8dcbe',
      text: '#2b1d16',
      textMuted: '#6f5a4c',
      primary: '#a32a16',
      primaryHover: '#7f1f10',
      primaryText: '#fdf3e7',
      secondary: '#7d5a3a',
      border: '#d9c9ae',
      success: '#4d7a3a',
      warning: '#a86e12',
      danger: '#a32a16',
      codeBackground: '#2b1d16',
      codeText: '#f5ecd9',
    },
    typography: {
      fontBody: 'Georgia, "Times New Roman", serif',
      fontHeading: '"Bodoni Moda", Georgia, serif',
      fontMono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      fontSizeBase: '17px',
      fontSizeXs: '0.75rem',
      fontSizeSm: '0.875rem',
      fontSizeMd: '1rem',
      fontSizeLg: '1.25rem',
      fontSizeXl: '2.25rem',
      lineHeightBody: '1.7',
      lineHeightHeading: '1.12',
      fontWeightNormal: '400',
      fontWeightMedium: '600',
      fontWeightBold: '700',
    },
    radius: {
      radiusSm: '0.125rem',
      radiusMd: '0.25rem',
      radiusLg: '0.5rem',
      radiusFull: '999px',
    },
    shadow: {
      shadowSm: '0 1px 2px rgb(43 29 22 / 0.08)',
      shadowMd: '0 8px 24px rgb(43 29 22 / 0.10)',
      shadowLg: '0 20px 50px rgb(43 29 22 / 0.12)',
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
      contentWidth: '68ch',
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
        background: '#1a100d',
        surface: '#241711',
        surfaceAlt: '#2f1e16',
        text: '#f2e8dc',
        textMuted: '#b5a28c',
        primary: '#e07a5e',
        primaryHover: '#eda27e',
        primaryText: '#2b0e06',
        border: '#3a2a20',
        codeBackground: '#100a07',
        codeText: '#f5ecd9',
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
        fontSize: 'clamp(2.3rem, 6vw, 4rem)',
      },
      h2: {
        fontSize: 'clamp(1.7rem, 4vw, 2.5rem)',
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
        borderInlineStart: '3px solid var(--color-primary)',
        color: 'var(--color-text-muted)',
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontStyle: 'italic',
        fontSize: '1.1em',
      },
      hr: {
        border: '0',
        borderTop: '3px double var(--color-border)',
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
  options: {
    includeMinimalReset: true,
    reducedMotion: true,
  },
  fonts: {
    heading: {
      family: 'Bodoni Moda',
      weights: [400, 700],
      italic: true,
    },
  },
} satisfies Theme

export const imbuiaPreset = {
  schemaVersion: 2,
  metadata: {
    name: 'Imbuia',
    description:
      'Cozy espresso browns with golden imbuia streaks for slow reading.',
    version: '1.0.0',
  },
  tokens: {
    colors: {
      background: '#1b130c',
      surface: '#261a11',
      surfaceAlt: '#322215',
      text: '#f2e7d8',
      textMuted: '#bfa88e',
      primary: '#d9a441',
      primaryHover: '#e6b95c',
      primaryText: '#2a1c07',
      secondary: '#8f7a5f',
      border: '#3d2e1e',
      success: '#9ccb8f',
      warning: '#dfa04e',
      danger: '#e07a6a',
      codeBackground: '#110b06',
      codeText: '#f3e9d9',
    },
    typography: {
      fontBody: 'Newsreader, Georgia, serif',
      fontHeading: 'Newsreader, Georgia, serif',
      fontMono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      fontSizeBase: '18px',
      fontSizeXs: '0.75rem',
      fontSizeSm: '0.875rem',
      fontSizeMd: '1rem',
      fontSizeLg: '1.25rem',
      fontSizeXl: '2.25rem',
      lineHeightBody: '1.75',
      lineHeightHeading: '1.12',
      fontWeightNormal: '400',
      fontWeightMedium: '600',
      fontWeightBold: '700',
    },
    radius: {
      radiusSm: '0.375rem',
      radiusMd: '0.75rem',
      radiusLg: '1.25rem',
      radiusFull: '999px',
    },
    shadow: {
      shadowSm: '0 1px 2px rgb(0 0 0 / 0.45)',
      shadowMd: '0 12px 32px rgb(50 30 10 / 0.45)',
      shadowLg: '0 24px 60px rgb(50 30 10 / 0.5)',
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
      contentWidth: '68ch',
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
        background: '#130d07',
        surface: '#1c140c',
        surfaceAlt: '#261a0f',
        border: '#33261a',
        codeBackground: '#0b0704',
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
        fontSize: 'clamp(2.3rem, 7vw, 4.2rem)',
        letterSpacing: '-0.02em',
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
        borderInlineStart: '3px solid var(--color-primary)',
        color: 'var(--color-text)',
        fontStyle: 'italic',
        fontSize: '1.15em',
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
  options: {
    includeMinimalReset: true,
    reducedMotion: true,
  },
  fonts: {
    body: {
      family: 'Newsreader',
      weights: [400, 600, 700],
      italic: true,
    },
    heading: {
      family: 'Newsreader',
      weights: [400, 600, 700],
      italic: true,
    },
  },
} satisfies Theme

export const cerejeiraPreset = {
  schemaVersion: 2,
  metadata: {
    name: 'Cerejeira',
    description:
      'Cherry-wood tan and rust with slab serifs for a sturdy workshop feel.',
    version: '1.0.0',
  },
  tokens: {
    colors: {
      background: '#faf4ec',
      surface: '#f1e5d6',
      surfaceAlt: '#e4d2bd',
      text: '#33231c',
      textMuted: '#7a6252',
      primary: '#b05238',
      primaryHover: '#8f3f2a',
      primaryText: '#fdf5ec',
      secondary: '#6a7a52',
      border: '#dfccba',
      success: '#587d43',
      warning: '#a86e12',
      danger: '#b03a2e',
      codeBackground: '#33231c',
      codeText: '#f5ead9',
    },
    typography: {
      fontBody: 'Inter, ui-sans-serif, system-ui, sans-serif',
      fontHeading: '"Zilla Slab", Georgia, serif',
      fontMono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      fontSizeBase: '16px',
      fontSizeXs: '0.75rem',
      fontSizeSm: '0.875rem',
      fontSizeMd: '1rem',
      fontSizeLg: '1.25rem',
      fontSizeXl: '2.25rem',
      lineHeightBody: '1.65',
      lineHeightHeading: '1.1',
      fontWeightNormal: '400',
      fontWeightMedium: '600',
      fontWeightBold: '700',
    },
    radius: {
      radiusSm: '0.25rem',
      radiusMd: '0.5rem',
      radiusLg: '0.75rem',
      radiusFull: '999px',
    },
    shadow: {
      shadowSm: '0 1px 2px rgb(51 35 28 / 0.10)',
      shadowMd: '0 4px 12px rgb(51 35 28 / 0.12)',
      shadowLg: '0 16px 36px rgb(51 35 28 / 0.16)',
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
        background: '#1d1410',
        surface: '#281c15',
        surfaceAlt: '#342418',
        text: '#f2e8dd',
        textMuted: '#bda78e',
        primary: '#d98a6a',
        primaryHover: '#e6a284',
        primaryText: '#2e1206',
        border: '#3d2c1e',
        codeBackground: '#120c08',
        codeText: '#f5ece0',
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
        fontSize: 'clamp(2.3rem, 7vw, 4.25rem)',
        letterSpacing: '-0.02em',
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
        borderInlineStart: '4px solid var(--color-secondary)',
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
        borderBottomWidth: '4px',
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
  options: {
    includeMinimalReset: true,
    reducedMotion: true,
  },
  fonts: {
    heading: {
      family: 'Zilla Slab',
      weights: [400, 600, 700],
    },
  },
} satisfies Theme

export const ebanoPreset = {
  schemaVersion: 2,
  metadata: {
    name: 'Ébano',
    description:
      'Near-black ebony with champagne accents and garamond elegance.',
    version: '1.0.0',
  },
  tokens: {
    colors: {
      background: '#0e0d0f',
      surface: '#17151a',
      surfaceAlt: '#221e26',
      text: '#ece9f0',
      textMuted: '#a5a0ad',
      primary: '#d3c692',
      primaryHover: '#e4d9ae',
      primaryText: '#1a1709',
      secondary: '#7d7a85',
      border: '#2b2731',
      success: '#97bd8e',
      warning: '#d9b45c',
      danger: '#d98a7e',
      codeBackground: '#080709',
      codeText: '#edeaf2',
    },
    typography: {
      fontBody: 'Inter, ui-sans-serif, system-ui, sans-serif',
      fontHeading: 'Cormorant Garamond, Georgia, serif',
      fontMono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      fontSizeBase: '17px',
      fontSizeXs: '0.75rem',
      fontSizeSm: '0.875rem',
      fontSizeMd: '1rem',
      fontSizeLg: '1.25rem',
      fontSizeXl: '2.25rem',
      lineHeightBody: '1.8',
      lineHeightHeading: '1.05',
      fontWeightNormal: '400',
      fontWeightMedium: '500',
      fontWeightBold: '600',
    },
    radius: {
      radiusSm: '0.25rem',
      radiusMd: '0.5rem',
      radiusLg: '1rem',
      radiusFull: '999px',
    },
    shadow: {
      shadowSm: '0 1px 2px rgb(0 0 0 / 0.55)',
      shadowMd: '0 12px 36px rgb(0 0 0 / 0.5)',
      shadowLg: '0 28px 70px rgb(0 0 0 / 0.6)',
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
      contentWidth: '70ch',
      wideWidth: '1120px',
      bodyPadding: '1.25rem',
      sectionSpacing: '3.5rem',
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
        background: '#0a090b',
        surface: '#121014',
        surfaceAlt: '#1b181f',
        border: '#241f2a',
        codeBackground: '#050406',
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
        fontSize: 'clamp(2.6rem, 7vw, 4.8rem)',
      },
      h2: {
        fontSize: 'clamp(1.8rem, 4vw, 2.7rem)',
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
        borderInlineStart: '2px solid var(--color-primary)',
        color: 'var(--color-text-muted)',
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontStyle: 'italic',
        fontSize: '1.15em',
        letterSpacing: '0.01em',
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
  options: {
    includeMinimalReset: true,
    reducedMotion: true,
  },
  fonts: {
    heading: {
      family: 'Cormorant Garamond',
      weights: [500, 600, 700],
      italic: true,
    },
  },
} satisfies Theme

export const presets = {
  Minimal: minimalPreset,
  Editorial: editorialPreset,
  Documentation: documentationPreset,
  Academic: academicPreset,
  Terminal: terminalPreset,
  'Simple.css': simpleCssPreset,
  Noir: noirPreset,
  Porcelain: porcelainPreset,
  Sage: sagePreset,
  Açaí: acaiPreset,
  'Açaí com Banana': acaiBananaPreset,
  'Lima-limão': limaLimaoPreset,
  Morango: morangoPreset,
  Melancia: melanciaPreset,
  'Fruta-do-conde': frutaDoCondePreset,
  Mogno: mognoPreset,
  Carvalho: carvalhoPreset,
  Jacarandá: jacarandaPreset,
  Oceano: oceanoPreset,
  Floresta: florestaPreset,
  'Pôr-do-sol': porDoSolPreset,
  Lavanda: lavandaPreset,
  Cyberpunk: cyberpunkPreset,
  'Drácula': draculaPreset,
  'Meia-noite': meiaNoitePreset,
  Brutalista: brutalistaPreset,
  Jornal: jornalPreset,
  'Algodão-doce': algodaoDocePreset,
  Corporativo: corporativoPreset,
  'Maracujá': maracujaPreset,
  'Pitaya': pitayaPreset,
  'Goiaba': goiabaPreset,
  'Manga': mangaPreset,
  'Pau-brasil': pauBrasilPreset,
  'Imbuia': imbuiaPreset,
  'Cerejeira': cerejeiraPreset,
  'Ébano': ebanoPreset,
} as const

export type PresetName = keyof typeof presets
