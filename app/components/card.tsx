export function Card() {
    return (
        <div className="card shadow-sm">
            <figure>
                <img
                    className="rounded-lg aspect-16/9"
                    src="https://media.rawg.io/media/games/737/737ea5662211d2e0bbd6f5989189e4f1.jpg"
                    alt="Game" />
            </figure>
            <div className="card-body px-0 py-2">
                <h2 className="card-title">Game Title</h2>
                <p>₱ 999.99</p>
                <div className="card-actions pt-2">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
}