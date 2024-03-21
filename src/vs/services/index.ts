const myCommand = async () => {
  const res = await fetch(
    'https://ideaplugin.lonsun.cn/codereview/codeReview/getUserList',
  );
  const data: { userId: number; name: string }[] = await res.json();
  return data ?? [];
};

export { myCommand };
