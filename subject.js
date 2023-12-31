class SubjectRemove {
	constructor() {
		this._observer = [];
	}

	subscribe(observer) {
		this._observer.push(observer);
	}

	fire() {
		this._observer.forEach(observers => observers.updateTotalLikes());
	}
}