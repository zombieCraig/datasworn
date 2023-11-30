// Code generated by jtd-codegen for C# + System.Text.Json v0.2.1

using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Datasworn
{
    [JsonConverter(typeof(AssetOptionFieldSelectValueChoiceStatOptionTypeJsonConverter))]
    public enum AssetOptionFieldSelectValueChoiceStatOptionType
    {
        Option,
    }
    public class AssetOptionFieldSelectValueChoiceStatOptionTypeJsonConverter : JsonConverter<AssetOptionFieldSelectValueChoiceStatOptionType>
    {
        public override AssetOptionFieldSelectValueChoiceStatOptionType Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            string value = JsonSerializer.Deserialize<string>(ref reader, options);
            switch (value)
            {
                case "option":
                    return AssetOptionFieldSelectValueChoiceStatOptionType.Option;
                default:
                    throw new ArgumentException(String.Format("Bad AssetOptionFieldSelectValueChoiceStatOptionType value: {0}", value));
            }
        }

        public override void Write(Utf8JsonWriter writer, AssetOptionFieldSelectValueChoiceStatOptionType value, JsonSerializerOptions options)
        {
            switch (value)
            {
                case AssetOptionFieldSelectValueChoiceStatOptionType.Option:
                    JsonSerializer.Serialize<string>(writer, "option", options);
                    return;
            }
        }
    }
}
