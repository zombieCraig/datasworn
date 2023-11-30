// Code generated by jtd-codegen for C# + System.Text.Json v0.2.1

using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Datasworn
{
    /// <summary>
    /// Represents an option in a list of choices.
    /// </summary>
    public class AssetOptionFieldSelectEnhancementChoiceOptionGroupChoice
    {
        [JsonPropertyName("label")]
        public Label Label { get; set; }

        [JsonPropertyName("option_type")]
        public AssetOptionFieldSelectEnhancementChoiceOptionGroupChoiceOptionType OptionType { get; set; }

        [JsonPropertyName("enhance_asset")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public AssetEnhancement? EnhanceAsset { get; set; }

        [JsonPropertyName("enhance_moves")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public IList<MoveEnhancement> EnhanceMoves { get; set; }
    }
}
