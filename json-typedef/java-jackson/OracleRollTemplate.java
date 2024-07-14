// Code generated by jtd-codegen for Java + Jackson v0.2.1

package Datasworn;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

/**
 * Provides string templates that may be used in place of the static row
 * text from `OracleRollableRow#text`, `OracleRollableRow#text2`, and
 * `OracleRollableRow#text3`.
 * 
 *   These strings are formatted in Markdown, but use a special syntax for their
 * placeholders: `{{text>some_oracle_rollable_id}}`. The placeholder should be
 * replaced with the value of a rolled (or selected) `OracleRollableRow#text`
 * from the target oracle rollable ID.
 */
@JsonSerialize
public class OracleRollTemplate {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("text")
    private MarkdownTemplateString text;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("text2")
    private MarkdownTemplateString text2;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("text3")
    private MarkdownTemplateString text3;

    public OracleRollTemplate() {
    }

    /**
     * Getter for text.<p>
     * A string template that may be used in place of OracleRollableRow#text.
     */
    public MarkdownTemplateString getText() {
        return text;
    }

    /**
     * Setter for text.<p>
     * A string template that may be used in place of OracleRollableRow#text.
     */
    public void setText(MarkdownTemplateString text) {
        this.text = text;
    }

    /**
     * Getter for text2.<p>
     * A string template that may be used in place of OracleRollableRow#text2.
     */
    public MarkdownTemplateString getText2() {
        return text2;
    }

    /**
     * Setter for text2.<p>
     * A string template that may be used in place of OracleRollableRow#text2.
     */
    public void setText2(MarkdownTemplateString text2) {
        this.text2 = text2;
    }

    /**
     * Getter for text3.<p>
     * A string template that may be used in place of OracleRollableRow#text3.
     */
    public MarkdownTemplateString getText3() {
        return text3;
    }

    /**
     * Setter for text3.<p>
     * A string template that may be used in place of OracleRollableRow#text3.
     */
    public void setText3(MarkdownTemplateString text3) {
        this.text3 = text3;
    }
}
