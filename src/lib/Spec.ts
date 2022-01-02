import SwaggerParser from "@apidevtools/swagger-parser";
import { OpenAPIV2, OpenAPIV3, OpenAPIV3_1, OpenAPI } from "openapi-types";

/** OpenAPI Specification Utility Class. */
class Spec {
  public document: OpenAPI.Document;
  public v2?: OpenAPIV2.Document;
  public v3?: OpenAPIV3.Document;
  public v3_1?: OpenAPIV3_1.Document;

  constructor(document: OpenAPI.Document) {
    if (Spec.isV2(document)) {
      this.document = document as OpenAPIV2.Document;
    } else if (Spec.isV3(document)) {
      this.document = document as OpenAPIV3.Document;
    } else if (Spec.isV3_1(document)) {
      this.document = document as OpenAPIV3_1.Document;
    } else {
      throw new Error("Specification provided does not match known OpenAPI specification version.");
    }
  }

  /** Async class constructor with swagger dereferencing. Returns a JSON openapi document. */
  public static async createInstance(filepath: string) {
    const document = await SwaggerParser.validate(filepath);
    const spec = new Spec(document);
    return spec;
  }

  /** Type guard for version 2 swagger documents. */
  public static isV2(document: any): document is OpenAPIV2.Document {
    return document.swagger === "2.0";
  }

  /** Type guard for version 3 openAPI documents. */
  public static isV3(document: any): document is OpenAPIV3.Document {
    return document.openapi === "3.0.0";
  }

  /** Type guard for version 3.1 openAPI documents. */
  public static isV3_1(document: any): document is OpenAPIV3_1.Document {
    return document.openapi === "3.0.1";
  }

}

export default Spec;
