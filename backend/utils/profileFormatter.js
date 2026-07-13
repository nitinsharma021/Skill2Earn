function formatProfile(profile) {

    return {

        phone: profile.phone || "",

        profession: profile.profession || "",

        category: profile.category || "Other",

        experience: profile.experience || "",

        location: profile.location || "",

        price: profile.suggestedPrice || "",

        availability: profile.availability || "Available",

        about: profile.summary || ""

    };

}

module.exports = formatProfile;