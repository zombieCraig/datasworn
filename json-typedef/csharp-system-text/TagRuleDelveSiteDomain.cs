// Code generated by jtd-codegen for C# + System.Text.Json v0.2.1

using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Datasworn
{
    public class TagRuleDelveSiteDomain : TagRule
    {
        [JsonPropertyName("value_type")]
        public string ValueType_ { get => "DelveSiteDomain"; }

        [JsonPropertyName("applies_to")]
        public IList<ObjectType> AppliesTo { get; set; }

        [JsonPropertyName("description")]
        public MarkdownString Description { get; set; }

        /// <summary>
        /// If `true`, this field accepts an array of wildcard IDs. If `false`,
        /// this field accepts a single non-wildcard ID.
        /// </summary>
        [JsonPropertyName("wildcard")]
        public bool Wildcard { get; set; }
    }
}
