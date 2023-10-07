using Microsoft.AspNetCore.Mvc;

namespace Itinerly.Api.Controllers
{
    public record Itinerary(ItineraryEvent[] Events);

    public record ItineraryEvent(string Id, string Name, DateTimeOffset Start, TimeSpan Length);

    [ApiController]
    public class ItineraryController : ControllerBase
    {
        private static readonly Itinerary _itinerary = new(
            new ItineraryEvent[]
            {
            new("1", "drive around", DateTimeOffset.UtcNow, TimeSpan.FromMinutes(30)),
            new("2", "play", DateTimeOffset.UtcNow, TimeSpan.FromHours(1)),
            new("5", "walk", DateTimeOffset.UtcNow, TimeSpan.FromMinutes(15)),
            new("3", "eat", DateTimeOffset.UtcNow, TimeSpan.FromHours(1)),
            new("4", "drive home", DateTimeOffset.UtcNow, TimeSpan.FromMinutes(15)),
            });

        // GET: api/<ItinerlyController>
        [HttpGet("api/v1/itineraries")]
        public IEnumerable<Itinerary> Get()
        {
            return new Itinerary[] { _itinerary };
        }

        // GET api/<ItinerlyController>/5
        [HttpGet("api/v1/itineraries/{id}")]
        public Itinerary Get(string id)
        {
            return _itinerary;
        }

    }
}
