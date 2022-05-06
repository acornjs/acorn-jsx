import * as acorn from 'acorn';

declare function jsx(options?: jsx.Options): (BaseParser: typeof acorn.Parser) => typeof AcornJsxParser;

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

export class AcornJsxParser extends acorn.Parser {
  static readonly acornJsx: {
    tokTypes: typeof tokTypes;
    tokContexts: TokContexts
  };

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
