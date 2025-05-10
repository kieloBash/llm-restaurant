import { NextResponse } from "next/server";
import axios from "axios";
import { LLMOutputSchema } from "@/schemas/llm.schema";
import { FoursquarePlace } from "@/types/foursquare-place";

export async function POST(request: Request) {
  const foursSquareAPI_URL = process.env.FOURSQUARE_API_URL;
  const fourSquareAPI_KEY = process.env.FOURSQUARE_API_KEY;
  const fourSquareLimit = process.env.FOURSQUARE_LIMIT || "1";

  if (!foursSquareAPI_URL || !fourSquareAPI_KEY) {
    return NextResponse.json(
      { error: "Foursquare API credentials are not set." },
      { status: 500 }
    );
  }

  const body = await request.json();
  const validated = LLMOutputSchema.safeParse(body);

  if (!validated.success) {
    return NextResponse.json(
      { error: validated.error.format() },
      { status: 400 }
    );
  }

  const { action, parameters } = validated.data;

  if (action !== "restaurant_search") {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  const queryParams: Record<string, string> = {
    query: parameters.query,
  };

  if (parameters.open_now != null) {
    queryParams.open_now = String(parameters.open_now);
  }

  if (parameters.near) {
    queryParams.near = parameters.near;
  }

  if (parameters.min_price !== undefined) {
    queryParams.min_price = String(parameters.min_price);
  }

  const urlParams = new URLSearchParams(queryParams);

  const url = `${foursSquareAPI_URL}?${urlParams.toString()}&sort=RATING&limit=${fourSquareLimit}&fields=name%2Clocation%2Chours%2Cprice%2Ctastes%2Cdescription%2Crating%2Cfsq_id`;
  // console.log("Foursquare URL:", url);

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        Authorization: fourSquareAPI_KEY,
      },
    });

    const { results } = response.data;
    const restaurants = results as FoursquarePlace[];

    let filtered = restaurants;

    if (parameters.min_rating !== undefined && parameters.min_rating > 0) {
      filtered = filtered.filter(
        (r) =>
          r.rating !== undefined && r.rating >= (parameters.min_rating ?? 0)
      );
    }

    return NextResponse.json(filtered, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching data from Foursquare API:", error);
    return NextResponse.json(
      { error: error?.response?.data || "Internal Server Error" },
      { status: error?.response?.status || 500 }
    );
  }
}
