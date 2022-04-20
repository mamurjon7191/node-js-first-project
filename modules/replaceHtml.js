module.exports = function (html, obj) {
  let out = html.replace(/{Image}/g, obj.image);
  out = out.replace("{NameProduct}", obj.productName);
  out = out.replace("{OrganicProduct}", obj.organic ? "Organic" : "");
  out = out.replace("{Soni}", obj.quantity);
  out = out.replace("{Price}", obj.price);
  out = out.replace("{IdProduct}", obj.id);
  out = out.replace("{Country}", obj.country);
  out = out.replace("{productDescription}", obj.description);
  return out;
};
