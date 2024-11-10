const districtMap: Record<string, string> = {
    TVM: "Thiruvananthapuram",
    KLM: "Kollam",
    PTA: "Pathanamthitta",
    ALP: "Alappuzha",
    KTM: "Kottayam",
    IDK: "Idukki",
    EKM: "Ernakulam",
    TRR: "Thrissur",
    PKD: "Palakkad",
    MPM: "Malappuram",
    KZD: "Kozhikode",
    WYD: "Wayanad",
    KNR: "Kannur",
    KSD: "Kasaragod",
  };
  export function getDistrictFullName(abbreviation: string): string {
    return districtMap[abbreviation] || abbreviation;
  }
