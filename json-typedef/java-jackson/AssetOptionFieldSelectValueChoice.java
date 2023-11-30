// Code generated by jtd-codegen for Java + Jackson v0.2.1

package Datasworn;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "using")
@JsonSubTypes({
    @JsonSubTypes.Type(name = "asset_control", value = AssetOptionFieldSelectValueChoiceAssetControl.class),
    @JsonSubTypes.Type(name = "asset_option", value = AssetOptionFieldSelectValueChoiceAssetOption.class),
    @JsonSubTypes.Type(name = "attached_asset_control", value = AssetOptionFieldSelectValueChoiceAttachedAssetControl.class),
    @JsonSubTypes.Type(name = "attached_asset_option", value = AssetOptionFieldSelectValueChoiceAttachedAssetOption.class),
    @JsonSubTypes.Type(name = "condition_meter", value = AssetOptionFieldSelectValueChoiceConditionMeter.class),
    @JsonSubTypes.Type(name = "custom", value = AssetOptionFieldSelectValueChoiceCustom.class),
    @JsonSubTypes.Type(name = "stat", value = AssetOptionFieldSelectValueChoiceStat.class),
})
public abstract class AssetOptionFieldSelectValueChoice {
}
