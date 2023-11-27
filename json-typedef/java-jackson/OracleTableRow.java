// Code generated by jtd-codegen for Java + Jackson v0.2.1

package Datasworn;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.util.List;

@JsonSerialize
public class OracleTableRow {
    @JsonProperty("id")
    private OracleTableRowId id;

    @JsonProperty("max")
    private Short max;

    @JsonProperty("min")
    private Short min;

    @JsonProperty("result")
    private MarkdownString result;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("description")
    private MarkdownString description;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("embed_table")
    private OracleTableId embedTable;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("i18n")
    private I18nHints i18n;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("icon")
    private SvgImageUrl icon;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("rolls")
    private List<OracleTableRoll> rolls;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("suggestions")
    private Suggestions suggestions;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("summary")
    private MarkdownString summary;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("template")
    private OracleRollTemplate template;

    public OracleTableRow() {
    }

    /**
     * Getter for id.<p>
     * The unique Datasworn ID for this item.
     */
    public OracleTableRowId getId() {
        return id;
    }

    /**
     * Setter for id.<p>
     * The unique Datasworn ID for this item.
     */
    public void setId(OracleTableRowId id) {
        this.id = id;
    }

    /**
     * Getter for max.<p>
     * High end of the dice range for this table row.
     */
    public Short getMax() {
        return max;
    }

    /**
     * Setter for max.<p>
     * High end of the dice range for this table row.
     */
    public void setMax(Short max) {
        this.max = max;
    }

    /**
     * Getter for min.<p>
     * Low end of the dice range for this table row.
     */
    public Short getMin() {
        return min;
    }

    /**
     * Setter for min.<p>
     * Low end of the dice range for this table row.
     */
    public void setMin(Short min) {
        this.min = min;
    }

    /**
     * Getter for result.<p>
     */
    public MarkdownString getResult() {
        return result;
    }

    /**
     * Setter for result.<p>
     */
    public void setResult(MarkdownString result) {
        this.result = result;
    }

    /**
     * Getter for description.<p>
     */
    public MarkdownString getDescription() {
        return description;
    }

    /**
     * Setter for description.<p>
     */
    public void setDescription(MarkdownString description) {
        this.description = description;
    }

    /**
     * Getter for embedTable.<p>
     */
    public OracleTableId getEmbedTable() {
        return embedTable;
    }

    /**
     * Setter for embedTable.<p>
     */
    public void setEmbedTable(OracleTableId embedTable) {
        this.embedTable = embedTable;
    }

    /**
     * Getter for i18n.<p>
     */
    public I18nHints getI18n() {
        return i18n;
    }

    /**
     * Setter for i18n.<p>
     */
    public void setI18n(I18nHints i18n) {
        this.i18n = i18n;
    }

    /**
     * Getter for icon.<p>
     */
    public SvgImageUrl getIcon() {
        return icon;
    }

    /**
     * Setter for icon.<p>
     */
    public void setIcon(SvgImageUrl icon) {
        this.icon = icon;
    }

    /**
     * Getter for rolls.<p>
     */
    public List<OracleTableRoll> getRolls() {
        return rolls;
    }

    /**
     * Setter for rolls.<p>
     */
    public void setRolls(List<OracleTableRoll> rolls) {
        this.rolls = rolls;
    }

    /**
     * Getter for suggestions.<p>
     */
    public Suggestions getSuggestions() {
        return suggestions;
    }

    /**
     * Setter for suggestions.<p>
     */
    public void setSuggestions(Suggestions suggestions) {
        this.suggestions = suggestions;
    }

    /**
     * Getter for summary.<p>
     */
    public MarkdownString getSummary() {
        return summary;
    }

    /**
     * Setter for summary.<p>
     */
    public void setSummary(MarkdownString summary) {
        this.summary = summary;
    }

    /**
     * Getter for template.<p>
     */
    public OracleRollTemplate getTemplate() {
        return template;
    }

    /**
     * Setter for template.<p>
     */
    public void setTemplate(OracleRollTemplate template) {
        this.template = template;
    }
}
