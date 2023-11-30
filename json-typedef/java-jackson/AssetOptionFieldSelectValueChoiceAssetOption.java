// Code generated by jtd-codegen for Java + Jackson v0.2.1

package Datasworn;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.util.List;

/**
 * Represents an option in a list of choices.
 */
@JsonSerialize
public class AssetOptionFieldSelectValueChoiceAssetOption extends AssetOptionFieldSelectValueChoice {
    @JsonProperty("assets")
    private List<AssetIdWildcard> assets;

    @JsonProperty("label")
    private Label label;

    @JsonProperty("option")
    private DictKey option;

    @JsonProperty("option_type")
    private AssetOptionFieldSelectValueChoiceAssetOptionOptionType optionType;

    public AssetOptionFieldSelectValueChoiceAssetOption() {
    }

    /**
     * Getter for assets.<p>
     */
    public List<AssetIdWildcard> getAssets() {
        return assets;
    }

    /**
     * Setter for assets.<p>
     */
    public void setAssets(List<AssetIdWildcard> assets) {
        this.assets = assets;
    }

    /**
     * Getter for label.<p>
     */
    public Label getLabel() {
        return label;
    }

    /**
     * Setter for label.<p>
     */
    public void setLabel(Label label) {
        this.label = label;
    }

    /**
     * Getter for option.<p>
     * The dictionary key of the asset option field.
     */
    public DictKey getOption() {
        return option;
    }

    /**
     * Setter for option.<p>
     * The dictionary key of the asset option field.
     */
    public void setOption(DictKey option) {
        this.option = option;
    }

    /**
     * Getter for optionType.<p>
     */
    public AssetOptionFieldSelectValueChoiceAssetOptionOptionType getOptionType() {
        return optionType;
    }

    /**
     * Setter for optionType.<p>
     */
    public void setOptionType(AssetOptionFieldSelectValueChoiceAssetOptionOptionType optionType) {
        this.optionType = optionType;
    }
}
