using Vtt_Api.CommandAndQueryProtocol.Enums;

namespace Vtt_Api.Middleware.Authorization
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = true)]
    public class AuthorizeVttHandlerAttribute : Attribute
    {
        public readonly string? Module;
        public readonly ModuleAction[]? Actions;
        public AuthorizeVttHandlerAttribute()
        {

        }
        public AuthorizeVttHandlerAttribute(string module, ModuleAction[] actions)
        {
            Module = module;
            Actions = actions;
        }
        public AuthorizeVttHandlerAttribute(string module, ModuleAction action)
        {
            Module = module;
            Actions = new ModuleAction[] { action };
        }
    }
    
}
