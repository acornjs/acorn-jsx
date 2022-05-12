import * as acorn from 'acorn';

declare function jsx(options?: Options): (BaseParser: typeof acorn.Parser) => AcornJsxParser;

export interface Options {
  allowNamespacedObjects?: boolean;
  allowNamespaces?: boolean;
}

export const tokTypes: {
  jsxName: acorn.TokenType,
  jsxText: acorn.TokenType,
  jsxTagEnd: acorn.TokenType,
  jsxTagStart: acorn.TokenType
} & typeof acorn.tokTypes;

export type TokContexts = {
  tc_oTag: acorn.TokContext,
  tc_cTag: acorn.TokContext,
  tc_expr: acorn.TokContext
};

type P = typeof acorn.Parser;

// We pick (statics) from acorn rather than plain extending to avoid complaint
//   about base constructors needing the same return type (i.e., we return
//   `IAcornJsxParser` here)
export interface AcornJsxParser extends Pick<P, keyof P> {
  readonly acornJsx: {
    tokTypes: typeof tokTypes;
    tokContexts: TokContexts
  };

  new (options: acorn.Options, input: string, startPos?: number): IAcornJsxParser;
}

export interface IAcornJsxParser extends acorn.Parser {
  jsx_readToken(): string;
  jsx_readNewLine(normalizeCRLF: boolean): void;
  jsx_readString(quote: number): void;
  jsx_readEntity(): string;
  jsx_readWord(): void;
  jsx_parseIdentifier(): acorn.Node;
  jsx_parseNamespacedName(): acorn.Node;
  jsx_parseElementName(): acorn.Node | string;
  jsx_parseAttributeValue(): acorn.Node;
  jsx_parseEmptyExpression(): acorn.Node;
  jsx_parseExpressionContainer(): acorn.Node;
  jsx_parseAttribute(): acorn.Node;
  jsx_parseOpeningElementAt(startPos: number, startLoc?: acorn.SourceLocation): acorn.Node;
  jsx_parseClosingElementAt(startPos: number, startLoc?: acorn.SourceLocation): acorn.Node;
  jsx_parseElementAt(startPos: number, startLoc?: acorn.SourceLocation): acorn.Node;
  jsx_parseText(): acorn.Node;
  jsx_parseElement(): acorn.Node;
}

export as namespace jsx;
export default jsx;
