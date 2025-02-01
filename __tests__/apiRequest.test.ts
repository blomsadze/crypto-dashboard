import { TimeFrame } from "@/enums/index.enums";
import { apiRequest, axiosInstance } from "@/utils/apiRequest.util";

// Mock axios.create() to return the mock instance
jest.mock("axios", () => {
  const mockAxiosInstance = {
    request: jest.fn(),
  };
  return {
    create: jest.fn(() => mockAxiosInstance),
    isAxiosError: jest.fn(),
  };
});

describe("apiRequest", () => {
  let mockAxios: jest.Mocked<typeof axiosInstance>;

  beforeEach(() => {
    mockAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;
    mockAxios.request.mockClear(); // Reset mocks before each test
  });

  it("should return data", async () => {
    mockAxios.request.mockResolvedValue({
      data: [{ id: 1, title: "Test Asset" }],
    });

    const data = await apiRequest("https://api.example.com/assets", "get");

    expect(mockAxios.request).toHaveBeenCalledWith(
      expect.objectContaining({
        url: "https://api.example.com/assets",
        method: "get",
      })
    );
    expect(data).toEqual([{ id: 1, title: "Test Asset" }]);
  });

  it("should handle query parameters correctly", async () => {
    mockAxios.request.mockResolvedValue({ data: [] });

    const params = {
      assetId: "bitcoin",
      timeFrame: TimeFrame.H24,
    };

    await apiRequest("https://api.example.com/assets", "get", params);

    expect(mockAxios.request).toHaveBeenCalledWith(
      expect.objectContaining({
        params: expect.any(URLSearchParams),
      })
    );

    const queryParams = mockAxios.request.mock.calls[0][0].params;
    expect(queryParams.get("assetId")).toBe("bitcoin");
    expect(queryParams.get("timeFrame")).toBe("24h");
  });

  it("should handle errors", async () => {
    mockAxios.request.mockRejectedValue(new Error("Request failed"));

    await expect(
      apiRequest("https://api.example.com/nonexistent", "get")
    ).rejects.toThrow("Request failed");
  });
});
