// Code generated by jtd-codegen for Java + Jackson v0.2.1

package Datasworn;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "using")
@JsonSubTypes({
    @JsonSubTypes.Type(name = "asset_control", value = RollableValueAssetControl.class),
    @JsonSubTypes.Type(name = "asset_option", value = RollableValueAssetOption.class),
    @JsonSubTypes.Type(name = "attached_asset_control", value = RollableValueAttachedAssetControl.class),
    @JsonSubTypes.Type(name = "attached_asset_option", value = RollableValueAttachedAssetOption.class),
    @JsonSubTypes.Type(name = "condition_meter", value = RollableValueConditionMeter.class),
    @JsonSubTypes.Type(name = "custom", value = RollableValueCustom.class),
    @JsonSubTypes.Type(name = "stat", value = RollableValueStat.class),
})
public abstract class RollableValue {
}
