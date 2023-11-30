// Code generated by jtd-codegen for C# + System.Text.Json v0.2.1

using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Datasworn
{
    [JsonConverter(typeof(RollableValueJsonConverter))]
    public abstract class RollableValue
    {
    }

    public class RollableValueJsonConverter : JsonConverter<RollableValue>
    {
        public override RollableValue Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var readerCopy = reader;
            var tagValue = JsonDocument.ParseValue(ref reader).RootElement.GetProperty("using").GetString();

            switch (tagValue)
            {
                case "asset_control":
                    return JsonSerializer.Deserialize<RollableValueAssetControl>(ref readerCopy, options);
                case "asset_option":
                    return JsonSerializer.Deserialize<RollableValueAssetOption>(ref readerCopy, options);
                case "attached_asset_control":
                    return JsonSerializer.Deserialize<RollableValueAttachedAssetControl>(ref readerCopy, options);
                case "attached_asset_option":
                    return JsonSerializer.Deserialize<RollableValueAttachedAssetOption>(ref readerCopy, options);
                case "condition_meter":
                    return JsonSerializer.Deserialize<RollableValueConditionMeter>(ref readerCopy, options);
                case "custom":
                    return JsonSerializer.Deserialize<RollableValueCustom>(ref readerCopy, options);
                case "stat":
                    return JsonSerializer.Deserialize<RollableValueStat>(ref readerCopy, options);
                default:
                    throw new ArgumentException(String.Format("Bad Using value: {0}", tagValue));
            }
        }

        public override void Write(Utf8JsonWriter writer, RollableValue value, JsonSerializerOptions options)
        {
            JsonSerializer.Serialize(writer, value, value.GetType(), options);
        }
    }
}
