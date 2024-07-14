// Code generated by jtd-codegen for C# + System.Text.Json v0.2.1

using System.Text.Json.Serialization;

namespace Datasworn
{
    /// <summary>
    /// Information on the original creator of this material.
    /// </summary>
    public class AuthorInfo
    {
        /// <summary>
        /// The name of the author.
        /// </summary>
        [JsonPropertyName("name")]
        public Label Name { get; set; }

        /// <summary>
        /// An optional email contact for the author
        /// </summary>
        [JsonPropertyName("email")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public Email? Email { get; set; }

        /// <summary>
        /// An optional URL for the author's website.
        /// </summary>
        [JsonPropertyName("url")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public WebUrl? Url { get; set; }
    }
}
