namespace Vtt_Api.Services.Interface
{
    public interface ICryptoService
    {
        string Hash(string password, int iterations);
        string Hash(string password);
        bool Verify(string password, string hashedPassword);
        string GeneratePassword(int length = 8);
    }
}
