// Code generated by jtd-codegen for Java + Jackson v0.2.1

package Datasworn;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

/**
 * Describes the presentation of this table.
 */
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "style")
@JsonSubTypes({
    @JsonSubTypes.Type(name = "standalone", value = OracleTableRenderingStandalone.class),
})
public abstract class OracleTableRendering {
}
